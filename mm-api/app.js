const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const { NotFoundError } = require("./utils/errors")
const security = require("./middleware/security")

const app = express() // app is now an express object

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

app.use(morgan("tiny"))
app.use(express.json())
app.use(cors())

// for each request, check if a token exists in the authorization header
// if it does, attach the decoded user to res.locals
// so res.locals will be available in the route body!
app.use(security.extractUserFromJwt)

// put all extra routes here such as 
const authRoute = require("./routes/auth")
// todoRoute
// recapRoute
// social - stretch

// put all extra route paths here such ass
app.use("/auth", authRoute)
// app.use("/todo", todoRoute)
// app.use("/recap", recapRoute)
// app.use("/social", socialRoute) - stretch


app.get("/", async (req, res, next) => {
    res.status(200)
    res.json({ "Testing": "Success" })
})

// Handle all 404 errors at this point
app.use((req, res, next) => {
    return next(new NotFoundError())
})

// Handle generic errors
app.use((error, req, res, next) => {
    const status = error.status || 500
    const message = error.message
    
    return res.status(status).json({
        error: { message, status }
    })
})

module.exports = app