const mongoose = require("mongoose");
const ticketSchema = new mongoose.Schema(
  {
    userID: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    message:{type:String,required:true}
})

const AuthTicket = mongoose.model("AuthTicket", ticketSchema);

module.exports = AuthTicket;