const db = require("../db");
const { BadRequestError } = require("../utils/errors");
const Recap = require("../models/recap");
require("dotenv").config();

class Social {
  static async following(user) {
    if (!user?.userId) {
      throw new BadRequestError(`userId is missing from the user information in order 
                                        to get the people the user follows`);
    }

    // Get all the user is FOLLOWING
    const text = `
        SELECT followee_id AS "followeeId", 
                u.username AS "username", 
                u.image AS "profilePicture", 
                u.first_name AS "firstName", 
                u.last_name AS "lastName"
        FROM follow AS f
            INNER JOIN users AS u ON f.followee_id=u.user_id
        WHERE follower_id=$1
        `;
    const values = [user.userId];
    const result = await db.query(text, values);

    return result.rows; // array of objects { followeeId, username }
  }
  static async followers(user) {
    if (!user?.userId) {
      throw new BadRequestError(`userId is missing from the user information in order 
                                        to get the people the user follows`);
    }

    // Get all the user is being FOLLOWED BY
    const text = `
        SELECT follower_id AS "followerId", 
                u.username AS "username", 
                u.image as "profilePicture",
                u.first_name AS "firstName", 
                u.last_name AS "lastName"
        FROM follow AS f
            INNER JOIN users AS u ON f.follower_id=u.user_id
        WHERE followee_id=$1
        `;
    const values = [user.userId];
    const result = await db.query(text, values);

    return result.rows; // array of objects { followeeId, username }
  }

  static async notFollowingUsers(user) {
    if (!user?.userId) {
      throw new BadRequestError(`userId is missing from the user information in order 
                                        to get users for explore part`);
    }
    const text = `
    SELECT u.user_id AS "strangerId", 
            u.username AS "username", 
            u.image AS "profilePicture", 
            u.first_name AS "firstName", 
            u.last_name AS "lastName"
    FROM users AS u
    WHERE u.user_id !=$1 AND u.user_id  NOT IN ( SELECT followee_id 
                              FROM follow
                              WHERE follower_id=$1 )
    `;
    const values = [user.userId];
    const result = await db.query(text, values);

    return result.rows; // array of objects { followeeId, username }
  }

  static async follow(beingFollowedUsername, user) {
    // beingFollowedUsername from req.body, user from res.locals
    // in the front end, the user will have the full list of all usernames in the database
    // in which they can search from and then follow and send the username in the req.body
    if (!user?.userId) {
      throw new BadRequestError(`userId is missing from the user information in order 
                                        to be able to follow someone else`);
    }
    if (!beingFollowedUsername?.username) {
      throw new BadRequestError("No username given to follow");
    }
    let text = `SELECT user_id FROM users WHERE username=$1`;
    let values = [beingFollowedUsername.username];
    let result = await db.query(text, values);
    let followeeId = result.rows[0]; // this is the user with that id that will be followed

    // make sure a username exists with that ID
    if (followeeId === undefined) {
      throw new BadRequestError(
        "The username of the person trying to be followed does not exist"
      );
    } else {
      followeeId = followeeId.user_id;
    }

    // check if trying to follow themselves
    if (followeeId === user.userId) {
      throw new BadRequestError("Cannot follow yourself");
    }

    text = `SELECT followee_id FROM follow WHERE follower_id=$1`;
    values = [user.userId];
    result = await db.query(text, values);

    // check if the user already follows that user
    result.rows.forEach((objectWithId) => {
      if (objectWithId.followee_id === followeeId) {
        throw new BadRequestError("User already follows that user");
      }
    });

    text = `INSERT INTO follow ( 
    follower_id,
    followee_id)
    VALUES ($1, $2)
    RETURNING follower_id, followee_id`;
    values = [user.userId, followeeId];
    result = await db.query(text, values);

    return result.rows[0];
  }

  static async unfollow(beingUnfollowedUsername, user) {
    // beingUnfollowedUsername from req.body, user from res.locals
    // in the front end, the user will have the full list of all usernames in the database
    // in which they can search from and then follow and send the username in the req.body
    if (!user?.userId) {
      throw new BadRequestError(`userId is missing from the user information in order 
                                        to be able to unfollow someone else`);
    }
    if (!beingUnfollowedUsername?.username) {
      throw new BadRequestError("No username given to unfollow");
    }
    let text = `SELECT user_id FROM users WHERE username=$1`;
    let values = [beingUnfollowedUsername.username];
    let result = await db.query(text, values);
    let followeeId = result.rows[0]; // this is the user with that id that will be unfollowed

    // make sure a username exists with that ID
    if (followeeId === undefined) {
      throw new BadRequestError(
        "The username of the person trying to be unfollowed does not exist"
      );
    } else {
      followeeId = followeeId.user_id;
    }

    // make sure the user is not trying to unfollow themselves
    if (followeeId === user.userId) {
      throw new BadRequestError("Cannot unfollow yourself");
    }

    text = `SELECT followee_id FROM follow WHERE follower_id=$1`;
    values = [user.userId];
    result = await db.query(text, values);

    // check if the user already follows that user
    let found = false;
    result.rows.forEach((objectWithId) => {
      if (objectWithId.followee_id === followeeId) {
        found = true;
      }
    });

    // if not found that means you can't unfollow them
    if (!found) {
      throw new BadRequestError(
        "Cannot unfollow someone the user doesn't already follow"
      );
    }

    text = ` DELETE from follow
              WHERE follower_id=$1 AND followee_id=$2
              RETURNING follower_id, followee_id`;
    values = [user.userId, followeeId];
    result = await db.query(text, values);

    return result.rows[0];
  }

  static async fetchActivity(user) {
    if (!user?.userId) {
      throw new BadRequestError(`userId is missing from the user information in order 
                                        to be able to get their feed`);
    }

    let text = `SELECT f.followee_id AS "followeeId", u.username AS "username", u.first_name AS "firstName", u.last_name AS "lastName"
                FROM follow AS f
                  INNER JOIN users AS u ON u.user_id=f.followee_id
                WHERE follower_id=$1`;
    let values = [user.userId];
    let result = await db.query(text, values);

    let activity = [];

    for (let followeeObject of result.rows) {
      activity.push({
        friendId: followeeObject.followeeId,
        username: followeeObject.username,
        firstName: followeeObject.firstName,
        lastName: followeeObject.lastName,
        publicGraph: await Recap.fetchPublicGraphById(
          followeeObject.followeeId
        ),
      });
    }

    return activity;
  }
}

module.exports = Social;
