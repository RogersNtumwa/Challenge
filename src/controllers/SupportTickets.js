const AuthTicket = require("../models/AutheTickets")
const User = require("../models/user");
const appError = require("../utils/appError");
const asyncHandler = require("../utils/asyncHandler");

exports.getCustomerSupportTickets = asyncHandler(async(req,res,next)=>{

    // checking if user is admin
    const user = await User.findById(req.user.id)
    if(user.role !== "admin"){
        return next(new appError("You are not authorised for this action",401))
    }

    // getting all Customer Support Tickets
    const CustomerSupportTickets = await AuthTicket.find()
    res.status(200).json({
    data: {
      CustomerSupportTickets,
    },
  });
})