import express from 'express';
import fs from "fs";
import path from "path";
import url from "url";

const dirname = path.dirname(url.fileURLToPath(import.meta.url));
const app = express();

app.get('/image', imageController);
app.get('/pdf', pdfController);
app.get('/about', aboutController);
app.get(['/home', '/'], homeController);
app.use((req, res, next) => {
    res.status(404);
    res.contentType("text/html");
    res.end("Not Found!");
});

app.listen(3000, () => {
    console.log('Your Server is running on 3000');
});

function imageController(req, res, next) {
    res.status(200);
    res.contentType("image/webp");

    const src = fs.createReadStream(path.join(dirname, "chow.webp"));
    src.pipe(res);
}

function pdfController(req, res, next) {
    res.status(200);
    res.contentType("application/pdf");

    const src = fs.createReadStream(path.join(dirname, "lorem.pdf"));
    src.pipe(res);
}

function aboutController(req, res, next) {
    res.status(200);
    res.contentType("text/plain");

    const src = fs.createReadStream(path.join(dirname, "lorem.txt"));
    src.pipe(res);
}

function homeController(req, res, next) {
    res.status(200);
    res.contentType("text/html");
    res.end("Welcome to my website");
}
