const mongoose = require('mongoose')
const mongoURI = "mongodb://localhost:27017/c_note?readPreference=primary&appname=MongoDB%20Compass&ssl=false"

const connectToMongo = () =>{
    mongoose.connect(mongoURI, ()=>{
        console.log("Successfully connected to MongoDB")
    })
}

module.exports = connectToMongo