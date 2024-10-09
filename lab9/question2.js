"use strict";

import http from "http";
import fs from "fs";
import path from "path";
import url from "url";

const dirname = path.dirname(url.fileURLToPath(import.meta.url));

http.createServer(function (req, res) {
    const controller = getController(req);
    if (controller) {
        controller(req, res);
    } else {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("Not Found!");
    }
}).listen(3000, () => {
    console.log("Running on port 3000");
});

function getController(req) {
    const q = url.parse(req.url, true);
    const method = req.method;

    if (method === "GET") {
        if (q.pathname === "/image") return imageController;
        if (q.pathname === "/pdf") return pdfController;
        if (q.pathname === "/about") return aboutController;
        if (q.pathname === "/home" || url == "/") return homeController;
    }

    return null;
}

function imageController(req, res) {
    res.writeHead(200, { "Content-Type": "image/webp" });

    const src = fs.createReadStream(path.join(dirname, "chow.webp"));
    src.pipe(res);
}

function pdfController(req, res) {
    res.writeHead(200, { "Content-Type": "application/pdf" });

    const src = fs.createReadStream(path.join(dirname, "lorem.pdf"));
    src.pipe(res);
}

function aboutController(req, res) {
    res.writeHead(200, { "Content-Type": "text/plain" });

    const src = fs.createReadStream(path.join(dirname, "lorem.txt"));
    src.pipe(res);
}

function homeController(req, res) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("Welcome to my website");
}
