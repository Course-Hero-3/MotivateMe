const { BadRequestError, ForbiddenError } = require("../utils/errors")
const db = require("../db")


const authedUserOwnsTask = async (req, res, next) => {
    try {
        const publicUserFromDecodedToken = res.locals.user 
        
        if (!publicUserFromDecodedToken?.userId) {    // if the user passed in doesn't have a userId
            throw new BadRequestError(`userId is missing from the user information in order to create a task for the user`)
        }
        if (!req.body?.taskId) {
            throw new BadRequestError(`No taskId was passed through to update a task`)
        }
        const givenTaskId = req.body.taskId

        const taskExistsText = `SELECT * FROM tasks WHERE task_id=$1;`;
        const taskExistsValues = [givenTaskId]            
        const taskExistsResult = await db.query(taskExistsText, taskExistsValues);
        if (taskExistsResult.rows[0] === undefined || taskExistsResult.rows[0] === null) {
            throw new BadRequestError('That taskId does not exist.')
        }

        const checkText = `SELECT user_id FROM tasks WHERE task_id=$1;`;
        const checkValues = [givenTaskId]            
        const checkResult = await db.query(checkText, checkValues);

        if (checkResult.rows[0].user_id !== publicUserFromDecodedToken.userId) {
            throw new ForbiddenError("Not allowed to update/complete/delete a task that belongs to another user.")
        }
        return next()
    }
    catch (error) {
        return next(error)
    }
}

module.exports = {
    authedUserOwnsTask
}