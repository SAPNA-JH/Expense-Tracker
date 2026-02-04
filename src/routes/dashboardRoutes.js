const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { totalIncome } = require("../controllers/dashboardController");
const router = express.Router();

router.post("/totalIncome", authMiddleware,totalIncome );

module.exports = router ;