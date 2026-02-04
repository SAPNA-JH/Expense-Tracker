const pool = require("../config/db");

const totalIncome = async(req, res) =>{
    try{
        const userId = req.user.id;
        const result= await pool.query(
            `SELECT SUM(amount) AS total_Income FROM expense WHERE userId= user_id AND type = 'income`
            [userId]
        )
         res.status(200).json({
            totalIncome : result.rows[0].totalIncome,
        })
    }
    catch(err){
         console.error(err.message);
    res.status(500).json({
      message: "Server error",
    });

    }
}

module.exports = {totalIncome};