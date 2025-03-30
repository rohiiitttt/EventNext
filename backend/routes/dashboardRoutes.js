const express = require("express");
const dashboardController = require("../controllers/dashboardController");

const router = express.Router();

// Route to get dashboard data
router.get("/", dashboardController.getDashboardData);

module.exports = router;
