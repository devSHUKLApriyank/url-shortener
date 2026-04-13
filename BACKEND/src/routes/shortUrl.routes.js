import express from 'express';
import { createShortUrl, redirectFromShortUrl, createShortUrlAuth, getUserUrls, deleteUrl } from "../controller/short.url.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { protect } from "../middleware/protect.js";

const router = express.Router();

router.post("/", authMiddleware, createShortUrl);      
router.post("/guest", createShortUrlAuth);              
router.get("/user/urls", protect, getUserUrls)
router.delete("/user/urls/:id", protect, deleteUrl)  // ← add this
router.get("/:id", redirectFromShortUrl);

export default router;