var mongoose = require("mongoose")
var msgSchema = mongoose.Schema({
  msgId: String,
  room: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  message: {
    type: String ,
    required: true
  },
  time: {
    type: String,
  }
})
var msgsModel = mongoose.model("msgs", msgSchema)
module.exports = msgsModel