const express = require("express");
const User = require("../models/user");
const { createUserJwt } = require("../utils/tokens");
const security = require("../middleware/security");
const router = express.Router();
const {
  OAuth2Client,
} = require('google-auth-library');

const oAuth2Client = new OAuth2Client(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  'postmessage',
);

router.post("/google", async (req, res, next) => {
  try {
    // get tokens 
    const { tokens } = await oAuth2Client.getToken(req.body.code); // exchange code for tokens
    // Verify and decode the ID token to retrieve google user information
    const ticket = await oAuth2Client.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const publicUser = await User.googleLogin(payload);
    const token = createUserJwt(publicUser); // encode the user as a payload
    res.status(200);
    res.json({ user: publicUser, token });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const publicUser = await User.login(req.body);
    const token = createUserJwt(publicUser); // encode the user as a payload
    res.status(200);
    res.json({ user: publicUser, token });
  } catch (error) {
    next(error);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    const publicUser = await User.register(req.body);
    const token = createUserJwt(publicUser); // encode the user as a payload
    res.status(201);
    res.json({ user: publicUser, token });
  } catch (error) {
    next(error);
  }
});

// edit first name for user
router.put(
  "/editfirstname",
  security.requireAuthenticatedUser,
  async (req, res, next) => {
    try {
      const publicUserFromDecodedToken = res.locals.user;
      const updatedUser = await User.editFirstName(
        publicUserFromDecodedToken,
        req.body
      );
      res.status(200);
      res.json({ updatedUser });
    } catch (error) {
      next(error);
    }
  }
);

// edit last name for user
router.put(
  "/editlastname",
  security.requireAuthenticatedUser,
  async (req, res, next) => {
    try {
      const publicUserFromDecodedToken = res.locals.user;
      const updatedUser = await User.editLastName(
        publicUserFromDecodedToken,
        req.body
      );
      res.status(200);
      res.json({ updatedUser });
    } catch (error) {
      next(error);
    }
  }
);

// edit username for user
router.put(
  "/editusername",
  security.requireAuthenticatedUser,
  async (req, res, next) => {
    try {
      const publicUserFromDecodedToken = res.locals.user;
      const updatedUser = await User.editUsername(
        publicUserFromDecodedToken,
        req.body
      );
      res.status(200);
      res.json({ updatedUser });
    } catch (error) {
      next(error);
    }
  }
);

// edit password for user
router.put(
  "/editpassword",
  security.requireAuthenticatedUser,
  async (req, res, next) => {
    try {
      const publicUserFromDecodedToken = res.locals.user;
      const updatedUser = await User.editPassword(
        publicUserFromDecodedToken,
        req.body
      );
      res.status(200);
      res.json({ updatedUser });
    } catch (error) {
      next(error);
    }
  }
);

// edit image for user
router.put(
  "/editimage",
  security.requireAuthenticatedUser,
  async (req, res, next) => {
    try {
      const publicUserFromDecodedToken = res.locals.user;
      const updatedUser = await User.editImage(
        publicUserFromDecodedToken,
        req.body
      );
      res.status(200);
      res.json({ updatedUser });
    } catch (error) {
      next(error);
    }
  }
);

// edit phone for user
router.put(
  "/editphone",
  security.requireAuthenticatedUser,
  async (req, res, next) => {
    try {
      const publicUserFromDecodedToken = res.locals.user;
      const updatedUser = await User.editPhone(
        publicUserFromDecodedToken,
        req.body
      );
      res.status(200);
      res.json({ updatedUser });
    } catch (error) {
      next(error);
    }
  }
);

// example of a "protected endpoint" since it is using security middleware
router.get("/me", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    // this bit of code gets the user information AFTER the user is authenticated 100%
    const token = res.locals.user;
    const publicUser = await User.fetchUserByEmail(token.email, true);
    res.status(200);
    res.json({ user: publicUser });
  } catch (error) {
    next(error);
  }
});

router.get("/imagecredentials", async (req, res, next) => {
  try {
    // this bit of code gets the config information for uploading
    // to the aws s3 bucket
    const config = await User.getImageCredentials();
    res.status(200);
    res.json({ config: config });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
