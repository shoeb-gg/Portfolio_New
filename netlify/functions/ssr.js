const express = require("express");
const server = require("../dist/my-portfolio/server/server.mjs"); // Import Angular server file
const app = express();

app.use(express.static("dist/my-portfolio/browser"));
app.use(server.app);

exports.handler = async (event, context) => {
    return new Promise((resolve, reject) => {
        app(event, context, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};
