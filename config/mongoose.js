const mongoose = require("mongoose");
const user=process.env.MONGODB_USER
mongoose.connect(`mongodb+srv://${user}:rootrootrt@app1.shxgdxt.mongodb.net/?retryWrites=true&w=majority`)

const db =mongoose.connection;


db.on('error',console.error.bind('console',"Error connecting to Mongo db"))


db.once('open',()=>{
    console.log('Connected to DB');
})

module.exports = db