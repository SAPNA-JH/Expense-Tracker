const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { totalIncome, totalExpense, monthlyExpenses } = require("../controllers/dashboardController");
const router = express.Router();

router.get("/tota-income", authMiddleware,totalIncome );
router.get("/total-expense", authMiddleware, totalExpense);
router.get("/mothly-expense",authMiddleware, monthlyExpenses )


module.exports = router ;