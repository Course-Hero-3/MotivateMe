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
        res.json( { completedTask: completedPublicTask } )
    }
    catch (error) {
        next(error)
    }
})

router.delete("/deletetask", security.requireAuthenticatedUser, permissions.authedUserOwnsTask, async (req, res, next) => {
    try {
        // req.body needs to look like { taskId: taskId }
        const publicUserFromDecodedToken = res.locals.user 
        const deletedTask = await Todo.deleteTask(req.body, publicUserFromDecodedToken)
        res.status(200) 
        res.json( { deletedTask: deletedTask } )
    }
    catch (error) {
        next(error)
    }
})


module.exports = router