const jwt = require("jsonwebtoken")
const { SECRET_KEY } = require("../config")

const generateToken = (data) => {
    return jwt.sign(data, SECRET_KEY, { expiresIn: "24h" } )
}

const createUserJwt = (publicUser) => {
    // publicUser object has all attributes which will be stored in the token
    // so when decoding (in validateToken) it will return the whole object we encoded (lines 17+18)
    const payload = publicUser 
    return generateToken(payload)
}

// We are not  using the validateToken function anywhere yet..
const validateToken = (token) => {
    try {
        const decoded = jwt.verify(token, SECRET_KEY)
        return decoded
    }
    catch (error) {
        return {}
    }
}

module.exports = {
    createUserJwt,
    validateToken
}