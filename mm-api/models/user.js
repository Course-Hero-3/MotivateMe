const db = require("../db");
const { BadRequestError, UnauthorizedError } = require("../utils/errors");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { generateFromEmail } = require("unique-username-generator");


const BCRYPT_WORK_FACTOR = process.env.BCRYPT_WORK_FACTOR
  ? Number(process.env.BCRYPT_WORK_FACTOR)
  : 13;

class User {
  static returnPublicUser(userWithAllAttributes) {
    let loggedInWithGoogle = false;
    try {
      if (userWithAllAttributes?.made_from === "GOOGLE") {
        loggedInWithGoogle = true;
      }
    }
    catch (error) {
      loggedInWithGoogle = false
    }
    

    return {
      userId: userWithAllAttributes.user_id,
      email: userWithAllAttributes.email,
      username: userWithAllAttributes.username,
      firstName: userWithAllAttributes.first_name,
      lastName: userWithAllAttributes.last_name,
      image: userWithAllAttributes.image,
      loggedInWithGoogle: loggedInWithGoogle,
    };
  }


  static async editFirstName(user, firstNameObject) {
    if (!firstNameObject?.firstName) {
      throw new BadRequestError("No first name passed through to edit");
    }
    if (firstNameObject.firstName.length === 0) {
      throw new BadRequestError("First Name cannot be empty");
    }
    if (!user) {
      throw new BadRequestError("No user in order to update");
    }


    let updateQuery = await db.query(
      `
      UPDATE users
      SET first_name=$1
      WHERE user_id=$2
      RETURNING user_id, email, username, first_name, last_name, image, made_from
      `,
      [
        firstNameObject.firstName,
        user.userId
      ]
    );

    return await User.returnPublicUser(updateQuery.rows[0])
  }


  static async editLastName(user, lastNameObject) {
    if (!lastNameObject?.lastName) {
      throw new BadRequestError("No last name passed through to edit");
    }
    if (lastNameObject.lastName.length === 0) {
      throw new BadRequestError("Last Name cannot be empty");
    }
    if (!user) {
      throw new BadRequestError("No user in order to update");
    }


    let updateQuery = await db.query(
      `
      UPDATE users
      SET last_name=$1
      WHERE user_id=$2
      RETURNING user_id, email, username, first_name, last_name, image, made_from
      `,
      [
        lastNameObject.lastName,
        user.userId
      ]
    );

    return await User.returnPublicUser(updateQuery.rows[0])
  }

  static async editPassword(user, passwordObject) {
    if (!passwordObject?.password) {
      throw new BadRequestError("No password passed through to edit");
    }
    if (passwordObject.password.length === 0) {
      throw new BadRequestError("Password cannot be empty");
    }
    if (!user) {
      throw new BadRequestError("No user in order to update");
    }


    const hashedPassword = await bcrypt.hash(
      passwordObject.password,
      BCRYPT_WORK_FACTOR
    );

    let updateQuery = await db.query(
      `
      UPDATE users
      SET password=$1
      WHERE user_id=$2
      RETURNING user_id, email, username, first_name, last_name, image, made_from
      `,
      [
        hashedPassword,
        user.userId
      ]
    );

    return await User.returnPublicUser(updateQuery.rows[0])
  }

  static async editImage(user, imageObject) {
    if (!imageObject?.image) {
      throw new BadRequestError("No image passed through to change");
    }
    if (imageObject.image.length === 0) {
      throw new BadRequestError("Image cannot be empty");
    }
    if (!user) {
      throw new BadRequestError("No user in order to update");
    }

    let updateQuery = await db.query(
      `
      UPDATE users
      SET image=$1
      WHERE user_id=$2
      RETURNING user_id, email, username, first_name, last_name, image, made_from
      `,
      [
        imageObject.image,
        user.userId
      ]
    );

    return await User.returnPublicUser(updateQuery.rows[0])
  }

  static async editUsername(user, usernameObject) {
    if (!usernameObject?.username) {
      throw new BadRequestError("No username passed through to edit");
    }
    if (!user) {
      throw new BadRequestError("No user in order to update");
    }

    let maybeUserExistsUsername = await User.fetchUserByUsername(
      usernameObject.username
    );
    if (maybeUserExistsUsername) {
      throw new BadRequestError("Username already exists. Try another one.");
    }

    let updateQuery = await db.query(
      `
      UPDATE users
      SET username=$1
      WHERE user_id=$2
      RETURNING user_id, email, username, first_name, last_name, image, made_from
      `,
      [
        usernameObject.username,
        user.userId
      ]
    );

    return await User.returnPublicUser(updateQuery.rows[0])
  }

  static async googleLogin(information) {
    if (!information) {
      throw new BadRequestError(
        "No information was passed through when logging in with Google"
      );
    }

    const maybeUserExists = await User.fetchUserByEmail(information.email);
    if (maybeUserExists) {
      if (maybeUserExists.made_from !== "GOOGLE") {
        throw new BadRequestError(
          "Can only log into this email via manual log in"
        );
      }
      return User.returnPublicUser(maybeUserExists);
    } else {
      // then create a new user for this google account

      // generate a username similar to email and add 5 random numbers
      let generatedUsername = generateFromEmail(information.email, 5);
      let maybeUserExistsUsername = await User.fetchUserByUsername(
        generatedUsername
      );
      while (maybeUserExistsUsername) {
        // should not enter but if it exists, generate another username
        generatedUsername = generateFromEmail(information.email, 5);
        maybeUserExistsUsername = await User.fetchUserByUsername(
          generatedUsername
        );
      }

      const text = `INSERT INTO users (
        email, 
        password,
        username,
        first_name,
        last_name,
        image,
        made_from)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING user_id, email, password, username, first_name, last_name, image, made_from`;
      const values = [
        information.email.toLowerCase(),
        "googlepassword",
        generatedUsername,
        information.givenName,
        information.familyName,
        information.imageUrl,
        "GOOGLE",
      ];
      const result = await db.query(text, values);

      return User.returnPublicUser(result.rows[0]);
    }
  }

  static async login(information) {
    if (!information) {
      throw new BadRequestError("No email and password provided");
    }

    const requiredFields = ["email", "password"];
    requiredFields.forEach((field) => {
      if (!information.hasOwnProperty(field)) {
        throw new BadRequestError(
          `The field: "${field}" is missing from the user passed in to log in`
        );
      }
    });

    if (information.email.trim() == "" || information.password.trim() === "") {
      throw new BadRequestError("No email and password provided");
    }
    // EMAIL regex (not just @ symbol)
    const regex = /^[a-zA-Z0-9\.]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    if (regex.test(information.email) === false) {
      throw new BadRequestError("Invalid email passed through");
    }

    const maybeUserExists = await User.fetchUserByEmail(information.email);
    if (maybeUserExists) {
      if (maybeUserExists.made_from !== "APP") {
        throw new BadRequestError(
          "Can only log into this email via Google Log In"
        );
      }
      const isValid = await bcrypt.compare(
        information.password,
        maybeUserExists.password
      );
      if (isValid) {
        return User.returnPublicUser(maybeUserExists);
      }
    }
    throw new UnauthorizedError("Invalid email and password combination");
  }

  static async register(information) {
    if (!information) {
      throw new BadRequestError("Fill in all the fields please");
    }

    const requiredFields = [
      "email",
      "password",
      "username",
      "firstName",
      "lastName",
      "image",
      "phone"
    ];
    requiredFields.forEach((field) => {
      if (!information.hasOwnProperty(field) || !information[field]) {
        throw new BadRequestError(`The field: "${field}" is missing`);
      }
    });

    // EMAIL regex (not just @ symbol)
    const regex = /^[a-zA-Z0-9\.]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    if (regex.test(information.email) === false) {
      throw new BadRequestError("Invalid email passed through");
    }

    const maybeUserExistsEmail = await User.fetchUserByEmail(information.email);
    if (maybeUserExistsEmail) {
      // should not enter since email should not exist already
      throw new BadRequestError(
        "Email/Username already exists in our system. Try logging in"
      );
    }

    const maybeUserExistsUsername = await User.fetchUserByUsername(
      information.username
    );
    if (maybeUserExistsUsername) {
      // should not enter since username should not exist already
      throw new BadRequestError(
        "Email/Username already exists in our system. Try logging in"
      );
    }

    const hashedPassword = await bcrypt.hash(
      information.password,
      BCRYPT_WORK_FACTOR
    );

    const text = `INSERT INTO users (
            email, 
            password,
            username,
            first_name,
            last_name,
            image,
            phone)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING user_id, email, password, username, first_name, last_name, image, made_from`;
    const values = [
      information.email.toLowerCase(),
      hashedPassword,
      information.username,
      information.firstName,
      information.lastName,
      information.image,
      information.phone
    ];
    const result = await db.query(text, values);

    return User.returnPublicUser(result.rows[0]);
  }

  static async fetchUserByEmail(email) {
    if (!email) {
      throw new BadRequestError("No email provided");
    }
    const text = `SELECT * FROM users WHERE email=$1`;
    const values = [email.toLowerCase()];
    const result = await db.query(text, values);
    return result.rows[0]; // this is the user with that email
  }

  static async fetchUserByUsername(username) {
    if (!username) {
      throw new BadRequestError("No username provided");
    }
    const text = `SELECT * FROM users WHERE username=$1`;
    const values = [username.toLowerCase()];
    const result = await db.query(text, values);
    return result.rows[0]; // this is the user with that username
  }
}

module.exports = User;
