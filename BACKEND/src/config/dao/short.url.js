import UrlModel from "../../models/url.model.js";

export const saveShortUrl = async (shortUrl, longUrl, userId) => {
    try {
        const newUrl = new UrlModel({   // ✅ use the model, not the parameter
            short_url: shortUrl,
            full_url: longUrl,
        });

        if (userId) {
            newUrl.user = userId;
        }

        await newUrl.save();
        return newUrl;               // ✅ return it so callers can use it

    } catch (error) {
        console.error('Error saving short URL:', error);
        throw error;                 // ✅ rethrow so errors bubble up properly
    }
};

export const getShortUrl = async (shortUrl) => {
    return await UrlModel.findOneAndUpdate(
        { short_url: shortUrl },        // filter
        { $inc: { clicks: 1 } },        // update
        { returnDocument: true }                   // ✅ return updated document
    );
};


export const getCustomShortUrl= async (slug) => {
    return await UrlModel.findOne({ short_url:slug });
   
}
  
export const getUrlsByUserId = async (userId) => {
    return await UrlModel.find({ user: userId }).sort({ createdAt: -1 })
}

export const deleteUrlById = async (id, userId) => {
    return await UrlModel.findOneAndDelete({ _id: id, user: userId })
}