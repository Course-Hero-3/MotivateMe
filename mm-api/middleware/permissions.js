// this MIGHT handle..
// 1) PUT request to update a task

// This may be a simple function to make sure that the task that the user
// is trying to update BELONGS to that user already

// depends on Front-End Implementation
// may be as simple as..
// (might need to fetch the task by ID or something)
// if user.user_id !== task.user_id
// then throw Forbidden Error
// else next() to continue the PUT request in the route