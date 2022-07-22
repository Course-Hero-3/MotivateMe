const db = require("../db");
const { BadRequestError } = require("../utils/errors");
require("dotenv").config();

class Social {
  static async following(user) {
    if (!user?.userId) {
      throw new BadRequestError(`userId is missing from the user information in order 
                                        to get the people the user follows`);
    }

    // Get all the user is FOLLOWING
    const text = `
        SELECT followee_id AS "followeeId", u.username AS "username", u.image as "profilePicture"
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
        SELECT follower_id AS "followerId", u.username AS "username", u.image as "profilePicture"
        FROM follow AS f
            INNER JOIN users AS u ON f.follower_id=u.user_id
        WHERE followee_id=$1
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

  }
}

module.exports = Social;
