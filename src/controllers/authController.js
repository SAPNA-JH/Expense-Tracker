const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);


    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All field required",
      });
    }

    const existUser = await pool.query("SELECT * FROM users  WHERE email = $1", [email]);

    if (existUser.rows.length > 0) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    const newUser = await pool.query(
      "INSERT INTO users (name, email, password)  VALUES($1, $2, $3) RETURNING *",
      [name, email, hashedPassword],
    );

    res.status(201).json({
      message: "users register succesfully",
      user: {
        id: newUser.rows[0].id,
        name: newUser.rows[0].name,
        email: newUser.rows[0].email,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
        message:"server error"
    })
  }
};

const login = async(req, res) =>{
    try{
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json({
            message:"All feild required"
        })
    }

    const checkUser = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
    )

    if(checkUser.rows.length == 0){
        return res.status(400).json({
            message: "user not found"
        })
    }

    const result = checkUser.rows[0];
    const isMatch = await bcrypt.compare(password, result.password);

    if(!isMatch){
         return res.status(400).json({
        message: "Invalid credentials",
    })
}

   const token = jwt.sign(
      { id: result.id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // if(result.password != password){
    // return res.status(400).json({
    //     message: 'Invalid Credential'
    // })
    // }

    res.status(200).json({
        seccess:true,
        message: " register Successfully",
        token,
        users:{
            id: result.id,
            name: result.name,
            email: result.email,
        },
 })
}
catch (err) {
    console.log(err);
    res.status(500).json({
      seccess:false,
      data:null,
        message:err.message
    })
  }
};

module.exports = {register, login}
