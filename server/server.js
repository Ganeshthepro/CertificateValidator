const app = require("./src/app.js")
const connect = require("./src/database/connect.js")

const startServer = () => {
    try {
    const PORT = process.env.PORT || 3000
    connect()
        app.listen(PORT , () => {
            console.log(`server running on port ${PORT}`);
        })
    } catch (error) {
        console.log("something went wrong" + error.message);
        
    }
}

startServer()
