const jwt = require("jsonwebtoken")

const authMiddleware = (req, res, next) => {
    try{
        const autHeader = req.headers.authorization;
        console.log(autHeader);
        if(!autHeader){
            return res.status(401).json({
                message:"Token not provided"
            })
        }

        const token = autHeader.split(" ")[1];
         if (!token) {
      return res.status(401).json({
        message: "Invalid token format",
      });
    }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
       
            req.user = decoded; 

                next();

    }
    catch(err){
        return res.status(401).json({
      message: "Token invalid or expired",
    });

    }
}

module.exports = authMiddleware;
