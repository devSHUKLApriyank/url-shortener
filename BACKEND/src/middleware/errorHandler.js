import { AppError } from "../utils/AppError.js";

export const errorHandler = (err, req, res, next) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
    }

    if (err.code === 11000) {
        return res.status(400).json({
            success: false,
            message: "Duplicate entry, please try again",
        });
    }

    console.error(err);
    res.status(500).json({
        success: false,
        message: "Internal Server Error",
    });
};