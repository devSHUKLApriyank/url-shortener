import { getShortUrl, getUrlsByUserId,  deleteUrlById } from "../config/dao/short.url.js"
import { createShortUrlWithoutUser, createShortUrlWithUser } from "../services/short_url.service.js";

// For authenticated users
export const createShortUrl = async (req, res) => {
    try {
        const { url, slug } = req.body  // ← add slug
        const userId = req.user._id
        const shortUrl = await createShortUrlWithUser(url, req.user, userId, slug)  // ← pass slug
        return res.status(201).json({
            shortUrl: process.env.APP_URL + "/" + shortUrl.short_url
        })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const createShortUrlAuth = async (req, res) => {
    try {
        const { url } = req.body;
        const shortUrl = await createShortUrlWithoutUser(url);

        res.status(201).json({
            shortUrl: process.env.APP_URL + "/" + shortUrl.short_url
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const redirectFromShortUrl = async (req, res) => {
    try {
        const { id } = req.params;
        const url = await getShortUrl(id);

        if (url) {
            res.redirect(url.full_url);
        } else {
            res.status(404).json({ message: "Short URL not found" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const createCustomShortUrl = async (req, res) => {
    try {
        const { url, slug } = req.body;
        const userId = req.user._id; 
        const shortUrl = await createShortUrlWithUser(url, req.user, userId);
        

        res.status(201).json({
            shortUrl: process.env.APP_URL + "/" + shortUrl.short_url
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getUserUrls = async (req, res) => {
    try {
        const userId = req.user._id
        const urls = await getUrlsByUserId(userId)
        res.status(200).json({ urls })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const deleteUrl = async (req, res) => {
    try {
        const { id } = req.params
        const userId = req.user._id
        const deleted = await deleteUrlById(id, userId)
        if (!deleted) return res.status(404).json({ message: 'URL not found' })
        res.status(200).json({ message: 'URL deleted successfully' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}