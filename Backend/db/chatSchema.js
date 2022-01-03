const mongoose = require('mongoose')
const chatSchema = new mongoose.Schema({
    Message: {
        type: String,
        required: true

    },
    Date: {
        type: Date,
        default: Date.now()
    }

})

module.exports = mongoose.model("chat", chatSchema)