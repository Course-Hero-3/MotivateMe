const express = require("express")
const Todo = require("../models/todo")
const security = require("../middleware/security")
const permissions = require("../middleware/permissions")
const router = express.Router()


// example of a "protected endpoint" since it is using security middleware
router.post("/addtask", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        const publicUserFromDecodedToken = res.locals.user 
        const publicTask = await Todo.addTask(req.body, publicUserFromDecodedToken) 

        res.status(201)
        res.json( { task: publicTask } )
    }
    catch (error) {
        next(error)
    }
})

router.get("/alltasks", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        const publicUserFromDecodedToken = res.locals.user 
        const allPublicTasks = await Todo.allTasks(publicUserFromDecodedToken) 
        res.status(200)
        res.json( { "allTasks": allPublicTasks } )
    }
    catch (error) {
        next(error)
    }
})

router.put("/updatetask", security.requireAuthenticatedUser, permissions.authedUserOwnsTask, async (req, res, next) => {
    try {
        // needs taskId in req.body
        const publicUserFromDecodedToken = res.locals.user 
        const updatedPublicTask = await Todo.updateTask(req.body, publicUserFromDecodedToken)
        res.status(204) 
        res.json( { task: updatedPublicTask } )

    }
    catch (error) {
        next(error)
    }
})

router.post("/completetask", security.requireAuthenticatedUser, permissions.authedUserOwnsTask, async (req, res, next) => {
    try {
        // needs taskId in req.body as well
        const publicUserFromDecodedToken = res.locals.user 
        const completedPublicTask = await Todo.completeTask(req.body, publicUserFromDecodedToken)
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
        res.status(204) 
        res.json( { deletedTask: deletedTask } )
    }
    catch (error) {
        next(error)
    }
})


module.exports = router