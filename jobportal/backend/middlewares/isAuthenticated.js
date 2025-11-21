import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            });
        }

        // JWT_SECRET ko .env me define karo
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({
                message: "Invalid token",
                success: false,
            });
        }

        req.id = decoded.userId;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({
            message: "Token verification failed",
            success: false,
        });
    }
};

export default isAuthenticated;
