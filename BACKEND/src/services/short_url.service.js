import { generateNanoId } from "../utils/helper.js";
import { saveShortUrl, getCustomShortUrl } from "../config/dao/short.url.js"; 

export const createShortUrlWithoutUser = async (url) => {
    const shortId = generateNanoId(8);
    if (!shortId) throw new Error("Failed to generate short ID");
    const saved = await saveShortUrl(shortId, url);
    return saved; 
};

export const createShortUrlWithUser = async (url, user, userId, slug = null) => {
    const shortId = slug || generateNanoId(8);
    
    if (slug) {
        const exists = await getCustomShortUrl(slug); 
        if (exists) throw new Error("Custom slug already exists");
    }

    const saved = await saveShortUrl(shortId, url, userId); 
    return saved; 
};