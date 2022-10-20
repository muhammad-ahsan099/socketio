
var mongoose = require("mongoose")

function dbConnection() {
  mongoose.connect(
    `mongodb+srv://ahsan:ahsan456@cluster0.imd8n.mongodb.net/FirstDB?retryWrites=true&w=majority` ,
    { useNewUrlParser: true },

    function (err) {
      if (err) {
        console.log("err", err)
      } else {
        console.log("MongoDB successfully connected")
      }
    }
  )
}

module.exports = dbConnection
