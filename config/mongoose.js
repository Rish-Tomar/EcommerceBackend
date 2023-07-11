const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URL)

const db =mongoose.connection;


db.on('error',console.error.bind('console',"Error connecting to Mongo db"))


db.once('open',()=>{
    console.log('Connected to DB');
})

module.exports = db