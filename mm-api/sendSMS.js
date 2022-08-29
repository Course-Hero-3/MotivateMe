const authToken = process.env.TWILIO_AUTH_TOKEN
const accountSid = process.env.SID

const client = require('twilio')(accountSid, authToken)

client.messages.create({
    to:process.env.PHONE_NUM,
    from:process.env.TWILIO_PHONE_NUM,
    body:"MotivateMe will be the next big thing"
}).then((message) => {console.log(message)})