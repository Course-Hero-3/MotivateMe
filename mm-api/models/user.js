const db = require("../db")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")
const bcrypt = require("bcrypt")
require("dotenv").config()

const BCRYPT_WORK_FACTOR = process.env.BCRYPT_WORK_FACTOR ? Number(process.env.BCRYPT_WORK_FACTOR) : 13

class User {

    static returnPublicUser(userWithAllAttributes) {
        return {
            userId: userWithAllAttributes.user_id,
            email: userWithAllAttributes.email,
            username: userWithAllAttributes.username,
            firstName: userWithAllAttributes.first_name,
            lastName: userWithAllAttributes.last_name,
            image: userWithAllAttributes.image
        }
    }

    static async login(information) {
        if (!information) {
            throw new BadRequestError("No user passed through to log in.");
        }

        const requiredFields = ["email", "password"]
        requiredFields.forEach((field) => {
            if (!information.hasOwnProperty(field))
            {
                throw new BadRequestError(`The field: "${field}" is missing from the user passed in to log in`)
            }
        })

        const maybeUserExists = await User.fetchUserByEmail(information.email)
        if (maybeUserExists)
        {
            const isValid = await bcrypt.compare(information.password, maybeUserExists.password)
            if (isValid)
            {
                return User.returnPublicUser(maybeUserExists);
            }
        }
        throw new UnauthorizedError("Invalid email and password combination given.")
    }

    static async register(information) {
        if (!information) {
            throw new BadRequestError("No user information passed through to register.");
        }

        const requiredFields = ["email", "password", "username", "firstName", "lastName", "image"]
        requiredFields.forEach((field) => {
            if (!information.hasOwnProperty(field)) {
                throw new BadRequestError(`The field: "${field}" is missing from the user information passed in to register`)
            }
        })

        // In terms of checks, I will do that in the front end so the error message correctly pops up I think.
        if (information.email.indexOf("@") <= 0) {
            throw newBadRequestError("Invalid email passed when trying to register.");
        }

        const maybeUserExistsEmail = await User.fetchUserByEmail(information.email)
        if (maybeUserExistsEmail) { // should not enter since email should not exist already
            throw new BadRequestError("Email/Username already exists in our system. Try logging in.")
        }
        
        const maybeUserExistsUsername = await User.fetchUserByUsername(information.username)
        if (maybeUserExistsUsername) { // should not enter since username should not exist already
            throw new BadRequestError("Email/Username already exists in our system. Try logging in.")
        }
        
        const hashedPassword = await bcrypt.hash(information.password, BCRYPT_WORK_FACTOR)
       
        const text = 
        `INSERT INTO users (
            email, 
            password,
            username,
            first_name,
            last_name,
            image)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING user_id, email, password, username, first_name, last_name, image`;
        const values =  [    
                            information.email.toLowerCase(),
                            hashedPassword,
                            information.username,
                            information.firstName,
                            information.lastName,
                            information.image
                        ]
        const result = await db.query(text, values);   

        return User.returnPublicUser(result.rows[0]);
    }
    
    static async fetchUserByEmail(email) {
        if (!email)
        {
            throw new BadRequestError("No email passed through when fetching user by email.");
        }
        const text = `SELECT * FROM users WHERE email=$1`;
        const values = [email.toLowerCase()];
        const result = await db.query(text, values);
        return result.rows[0];  // this is the user with that email
    }

    static async fetchUserByUsername(username) {
        if (!username)
        {
            throw new BadRequestError("No username passed through");
        }
        const text = `SELECT * FROM users WHERE username=$1`;
        const values = [username.toLowerCase()];
        const result = await db.query(text, values);
        return result.rows[0];  // this is the user with that username
    }
}


module.exports = User