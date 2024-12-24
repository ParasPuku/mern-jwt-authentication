const jwt = require("jsonwebtoken");
const checkAuthentication = (req, res, next) => {
    const token = req.headers['authorization'];
    console.log("token", token)
    if (!token) {
        return res.status(401).json({ message: "Unauthorized!, JWT token not found" });
    }
    try {
        console.log("process.env.JWT_SECRET", process.env.JWT_SECRET)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decoded", decoded)
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Unauthorized, JWT wrong or invalid", error: error });
    }
}

module.exports = checkAuthentication;