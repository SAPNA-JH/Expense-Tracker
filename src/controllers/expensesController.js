const pool = require("../config/db");

const addExpenses = async (req, res) => {
  try {
    const { amount, type, category, date } = req.body;
    const userId = req.user.id;

    if (!amount || !type) {
      return res.status(400).json({
        message: "Amount and Type required",
      });
    }

    const result = await pool.query(
      `INSERT INTO expense (user_id, amount, type, category, date)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING * `,
      [userId, amount, type, category, date],
    );

    res.status(200).json({
      success:true,
      date:result.rows[0],
      message: "Expenses Added",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      success:false,
      date:null,
      message: errr.message, 

    });
  }
};

const updateExpenses = async (req, res) => {
  try {
    const expenseId = req.params.id;
    const userId = req.user.id;

    const { amount, type, category, date } = req.body;

    const checkExpenses = await pool.query(
      `SELECT * FROM expense WHERE id = $1 AND user_id = $2`,
      [expenseId, userId],
    );
    if (checkExpenses.rows.length == 0) {
      return res.status(400).json({
        message: "Epense not Found or unauthorized",
      });
    }

    const updateExpense = await pool.query(
      "UPDATE expense SET amount = $1, type=$2, category = $3, date=$4  WHERE id=$5  AND user_id= $6 RETURNING *",
      [amount, type, category, date, expenseId, userId],
    );

    res.status(200).json({
        success: true,
        data: updateExpense[0],
        message: "Expense updatef successfully",
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      success:false,
      data: null,
      message:err.message,
    });
  }
};

const deleteExpenses = async (req, res) => {
  try {
    const userId = req.user.id;
    const expenseId = req.params.id;
    const checkExpenses = await pool.query(
      `SELECT * FROM expense WHERE id = $1 AND user_id = $2`,
      [expenseId, userId],
    );
    if (checkExpenses.rows.length == 0) {
      return res.status(404).json({
        message: "Epense not Found or unauthorized",
      });
    }
    const deleteExpense = await pool.query(
      `DELETE FROM expense WHERE id = $1 AND user_id = $2`,
      [expenseId, userId],
    );
    res.status(200).json({
      success: true,
        data: deleteExpense[0],
        message: "Expense deleted successfully",


    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
       success: false,
      data: null,
      message: err.message,
    });
  }
};

module.exports = { addExpenses, updateExpenses, deleteExpenses };
