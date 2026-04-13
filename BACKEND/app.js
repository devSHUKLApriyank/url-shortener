import 'dotenv/config';
import express from 'express';
import connectDB from './src/config/mongodb.js';
import shortUrlRoutes from "./src/routes/shortUrl.routes.js";
import auth_routes from "./src/routes/auth.route.js";
import { redirectFromShortUrl } from './src/controller/short.url.controller.js';
import cors from 'cors';
import { errorHandler } from './src/middleware/errorHandler.js';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cors({ origin: ['http://localhost:5173'] ,
    credentials: true
})); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/auth", auth_routes); 
app.use('/api/create', shortUrlRoutes);
app.get('/:id', redirectFromShortUrl);
app.use(errorHandler);


connectDB().then(() => {
    app.listen(3000, () => {
        console.log('Server is running on http://localhost:3000');
    }).on('error', (err) => {
        console.error('Listen error:', err);
    });
});