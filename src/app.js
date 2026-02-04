const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const expenses = require("./routes/expensesRoute"); 
const dashBoard = require("./routes/dashboardRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use( "/auth", authRoutes);
app.use("/expenses", expenses );
app.use("/dashboard", dashBoard);

app.listen(5000, ()=>{
    console.log("Server running on port 5000");
})