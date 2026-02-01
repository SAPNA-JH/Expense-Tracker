const expres = require("express");
const { addExpenses, updateExpenses, deleteExpenses } = require("../controllers/expensesController");
const router = expres.Router();
const authMiddleware = require("../middleware/authMiddleware")

router.post("/addExpenses",authMiddleware, addExpenses);
router.put("/:id", authMiddleware,updateExpenses);
router.delete("/:id", authMiddleware, deleteExpenses )

module.exports= router;