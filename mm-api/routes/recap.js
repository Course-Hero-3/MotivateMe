const express = require("express")
const Recap = require("../models/recap")
const security = require("../middleware/security")
const router = express.Router()

// this is an example of a "protected endpoint" since it is using security middleware
router.get("/summary", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        const publicUserFromDecodedToken = res.locals.user 
        const summary = await Recap.getFactsByUserId(publicUserFromDecodedToken.userId) 
        res.status(200)
        res.json( { "summary": summary } )
    }
    catch (error) {
        next(error)
    }
})

module.exports = router