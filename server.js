const express = require("express");
const app = express();
const path = require("path");
const fetch = require("node-fetch");

app.use(express.static("public")); 

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/joke", async (req, res) => {
    try {
        const response = await fetch("https://v2.jokeapi.dev/joke/Any");
        const jokeData = await response.json();
        res.json(jokeData);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch joke." });
    }
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
