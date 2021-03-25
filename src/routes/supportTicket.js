const express = require("express");
const { getCustomerSupportTickets } = require("../controllers/SupportTickets");
const { protect } = require("../middleware/authourise");
const router = express.Router();


router.route("/").get(protect, getCustomerSupportTickets)

module.exports = router