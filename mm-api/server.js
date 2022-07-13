const app = require("./app")
const { PORT } = require ("./config")

app.listen(PORT, () => {
    console.log(`🔥 Server up and running on http://localhost:${PORT}`)
})