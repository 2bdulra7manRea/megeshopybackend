var mongoose = require("mongoose");
var schema = new mongoose.Schema({
  clientName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: [true, "the password is required"],
  },
  email: {
    type: String,
    required: [true, "the email is required"],
    unique: [true, "the email must be unique"],
  },
  favColor: {
    type: String,
  },
});
module.exports = mongoose.model("Client", schema);
