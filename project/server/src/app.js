import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import path from "path";
import url from "url";

import { importDataIfEmpty } from './helper.js';
import wordsRouter from './routes/words.js';

await importDataIfEmpty();

const port = process.env.PORT || 3000;
const app = express();
const dirname = path.dirname(url.fileURLToPath(import.meta.url));
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'WAP API Swagger',
        },
    },
    apis: [path.join(dirname, "routes", "*.js")]
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
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
