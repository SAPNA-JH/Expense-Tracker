const pool = require("../config/db");

const totalIncome = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await pool.query(
      `SELECT SUM(amount) AS total_Income FROM expense WHERE userId= user_id AND type = 'income`[
        userId
      ],
    );
    if (result.rowCount > 0) {
      return res.status(200).json({
        // totalIncome : result.rows[0].totalIncome,
        success: true,
        data: result.rows[0].totalIncome,
        message: "Income Fetched successfuly",
      });
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      success: false,
      data: null,
      message: err.message,
    });
  }
};

const totalExpense = async(req, res) =>{
  try{
     const userId = req.user.id;
     const result = await pool.query(
      `SELECT SUM(amount) AS Total_Expense FROM expense WHERE userId = user_id AND type = 'expense`
      [userId]
     )
     if(result.rowCount > 0){
      return res.status(200).json({
        success:true,
        data: result.rows[0],
        message:err.message,
      })
     }

  }
  catch(err){
     console.error(err.message);
     return res.status(500).json({
      success: false,
      data: null,
      message:err.message,
     })
  }
}

const monthlyExpenses = async(req, res) =>{
  try{
      const userId = req.user.id;
      const {month , year } = req.query;
      if(!month || !year){
        return res.status(400).json({
          success:false,
          data:null,
          message:"All field required",

        })
      }

      const result = await pool.query(
        `SELECT SUM(amount) AS total_monthly_expense
        FROM expense WHERE user_id = $1
        AND type = 'expense'
        AND EXTRACT(month FROM date) = $2
        AND EXTRACT(year FROM date) = $3
        ORDER BY date DESC
        `,
        [userId, month, year]
      )

      return res.status(200).json({
        success:true,
        data:result.rows[0],
        message:"monthly Expenses fetched"
      })

  }
  catch(err){
    console.error(err.message);
   return res.status(500).json({
     success: false,
      message: "Server Error",
   })



  }

}

module.exports = { totalIncome, totalExpense, monthlyExpenses };
