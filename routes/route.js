
import express from 'express';
import Url from '../models/urlSchema.js';
import { generateShortUrl } from '../utils/urlGenerator.js';

const router = express.Router();

router.post('/longurl', async (req, res) => {
    const { originalUrl } = req.body;
    const shortUrl = generateShortUrl();

    try {
        const newUrl = new Url({ originalUrl, shortUrl });
        await newUrl.save();
        res.json({ originalUrl, shortUrl });
    } catch (error) {
        res.status(500).json({ message: "Failed to shorten URL", error });
    }
});

router.get('/:shortUrl', async (req, res) => {
    const { shortUrl } = req.params;

    try {
        const url = await Url.findOne({ shortUrl });
        if (url) {
            res.json({ originalUrl: url.originalUrl });
        } else {
            res.status(404).json({ message: "URL not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve URL", error });
    }
});

router.get('/', async (req, res) => {
    try {
        const urls = await Url.find();
        res.json(urls);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve URLs", error });
    }
});

export default router;
