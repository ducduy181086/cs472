import express from 'express';
import cors from 'cors';

import { importDataIfEmpty } from './helper.js';
import wordsRouter from './routes/words.js';

await importDataIfEmpty();

const port = process.env.PORT || 3000;
const app = express();
app.use(cors());

app.use('/api/v1/words', wordsRouter);
app.use((req, res, next) => {
    res.status(404).json({ error: req.url + ' API not supported!' });
});
app.use((err, req, res, next) => {
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, () => {
    console.log(`Your Server is running on ${port}`);
});
