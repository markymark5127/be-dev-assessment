import express from 'express';
import mongoose from 'mongoose';
import { nanoid } from 'nanoid';

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/urlShortener');

const urlSchema = new mongoose.Schema({
    original_url: { type: String, required: true },
    short_url: { type: String, required: true, unique: true },
    created_at: { type: Date, default: Date.now },
    click_count: { type: Number, default: 0 },
});

const URL = mongoose.model('URL', urlSchema);

app.use(express.json());

app.post('/shorten', async (req, res) => {
    const { original_url } = req.body;
    const short_url = nanoid(7);

    const newUrl = new URL({ original_url, short_url });
    await newUrl.save();

    res.json({ short_url });
});

app.get('/:short_url', async (req, res) => {
    const { short_url } = req.params;
    const url = await URL.findOne({ short_url });

    if (url) {
        url.click_count++;
        await url.save();
        res.redirect(url.original_url);
    } else {
        res.status(404).send('URL not found');
    }
});

app.get('/analytics/:short_url', async (req, res) => {
    const { short_url } = req.params;
    const url = await URL.findOne({ short_url });

    if (url) {
        res.json({ click_count: url.click_count });
    } else {
        res.status(404).send('URL not found');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
