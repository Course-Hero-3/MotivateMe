const express = require("express")
const Social = require("../models/social")
const security = require("../middleware/security")
const permissions = require("../middleware/permissions")
const router = express.Router()


router.get("/following", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        const publicUserFromDecodedToken = res.locals.user 
        const followingList = await Social.following(publicUserFromDecodedToken) 
        res.status(200)
        res.json( { following: followingList } )
    }
    catch (error) {
        next(error)
    }
})

router.get("/followers", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        const publicUserFromDecodedToken = res.locals.user 
        const followersList = await Social.followers(publicUserFromDecodedToken) 
        res.status(200)
        res.json( { followers: followersList } )
    }
    catch (error) {
        next(error)
    }
})

router.post("/follow", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        // needs username of person that is going to be followed in req.body
        const publicUserFromDecodedToken = res.locals.user 
        const newRelationship = await Social.follow(req.body, publicUserFromDecodedToken)
        res.status(201) 
        res.json( { newRelationship: newRelationship } )
    }
    catch (error) {
        next(error)
    }
})

router.delete("/unfollow", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        // needs username of person that is going to be UNfollowed in req.body
        const publicUserFromDecodedToken = res.locals.user 
        const unfollowedRelationship = await Social.unfollow(req.body, publicUserFromDecodedToken)
        res.status(204) 
        res.json( { unfollowedRelationship: unfollowedRelationship } )
    }
    catch (error) {
        next(error)
    }
})

router.get("/activity", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        const publicUserFromDecodedToken = res.locals.user 
        const usersAndActivity = await Social.fetchActivity(publicUserFromDecodedToken) 
        res.status(200)
        res.json( { activity: usersAndActivity } )
    }
    catch (error) {
        next(error)
    }
})


router.get("/notfollowing", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        const publicUserFromDecodedToken = res.locals.user 
        const otherUsers = await Social.notFollowingUsers(publicUserFromDecodedToken) 
        res.status(200)
        res.json( { otherUsers: otherUsers } )
    }
    catch (error) {
        next(error)
    }
})

router.get("/recommended", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        const publicUserFromDecodedToken = res.locals.user 
        const recommended = await Social.recommended(publicUserFromDecodedToken) 
        res.status(200)
        res.json( { recommended: recommended } )
    }
    catch (error) {
        next(error)
    }
})


module.exports = router