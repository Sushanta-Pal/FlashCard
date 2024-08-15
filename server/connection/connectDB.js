const mongoose = require('mongoose')
const connect =async(uri)=>{
    try {
        await mongoose.connect(uri).then(()=>{
            console.log('Connected to MongoDB')
            })
            } catch (error) {
                    console.log("Not connected to MongoDb");
            }
        }

        module.exports = connect
