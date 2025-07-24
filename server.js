const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Set up EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Home route
app.get("/", (req, res) => {
  res.render("index");
});

// Joke route using built-in fetch (Node 18+)
app.get("/joke", async (req, res) => {
  try {
    const response = await fetch("https://v2.jokeapi.dev/joke/Any");
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("❌ Error fetching joke:", error);
    res.status(500).json({ error: "Failed to fetch joke." });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
