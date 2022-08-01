require("dotenv").config()
require("colors")

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001
const EMAIL = process.env.EMAIL
const PASS = process.env.PASS
const SECRET_KEY = process.env.SECRET_KEY || "secret_dev"
const BCRYPT_WORK_FACTOR = process.env.BCRYPT_WORK_FACTOR || 10
SEND_GRID_API_KEY = process.env.SENDGRIDAPIKEY

function getDatabaseUri() {
    const dbUser = process.env.DATABASE_USER || "postgres"
    const dbPass = process.env.DATABASE_PASS ? encodeURI(process.env.DATABASE_PASS) : "postgres"
    const dbHost = process.env.DATABASE_HOST || "localhost"
    const dbPort = process.env.DATABASE_PORT || 5432
    const dbName = process.env.DATABASE_NAME || "motivate_me"

    return process.env.DATABASE_URL || `postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`
}

console.log("App Config".blue)
console.log("PORT:".blue, PORT)
console.log("Database URI:".blue, getDatabaseUri())
console.log("SECRET_KEY".blue, SECRET_KEY)
console.log("BCRYPT_WORK_FACTOR".blue, BCRYPT_WORK_FACTOR)

module.exports = {
    PORT, 
    getDatabaseUri,
    SECRET_KEY,
    BCRYPT_WORK_FACTOR,
    EMAIL,
    PASS,
    SEND_GRID_API_KEY
}
