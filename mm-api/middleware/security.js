const jwt = require("jsonwebtoken")
const { UnauthorizedError } = require("../utils/errors")
const { validateToken } = require("../utils/tokens")


// extract JWT from request header
const jwtFrom = ( {headers} ) => {
    if (headers?.authorization) { // if the header of authorization exists..
        const [scheme, token] = headers.authorization.split(" ") // destructuring the authorization key/value
        if (scheme.trim() === "Bearer") {
            return token
        }
    }
    return undefined // if it doesn't find anything / something goes wrong
}

// attach user to the res object
const extractUserFromJwt = (req, res, next) => {
    try {
        const token = jwtFrom(req)
        if (token) {
            res.locals.user = validateToken(token)
        }
        return next()
    }
    catch (error) {
        return next()
    }
}

// "requireAuthenticatedUser" function depends on "extractUserFromJwt" function to work because
// that function attaches the user to the res.locals object which the "requireAuthenticatedUser" uses

// verify an authed user exists
const requireAuthenticatedUser = (req, res, next) => {
    try {
        const { user } = res.locals
        if (!user?.email) { // check if it at least has email (user also has all the other attributes a public user contains)
            throw new UnauthorizedError()
        }
        return next()
    }
    catch (error) {
        return next(error)
    }
}

module.exports = {
    extractUserFromJwt,
    requireAuthenticatedUser
}