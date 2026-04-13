import { verifyToken } from "../utils/helper.js";
import { findUserById } from "../config/dao/user.dao.js";

export const authMiddleware = async(req, res, next) => {
    const token = req.cookies.accesstoken;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const userId = verifyToken(token); 
        const user = await findUserById(userId);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.user = user;
        next();
    } catch (error) {
        console.log("ERROR:", error); // ✅ add this too
        return res.status(401).json({ message: "Unauthorized" });
    }
}