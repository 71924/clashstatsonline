import express from "express";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// get API key from environment variables (Render will provide this)
const API_KEY = process.env.API_KEY;

// serve frontend files
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/player/:tag", async (req, res) => {
  try {
    const tag = encodeURIComponent("#" + req.params.tag);
    const response = await fetch(`https://api.clashroyale.com/v1/players/${tag}`, {
      headers: { Authorization: `Bearer ${API_KEY}` },
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// use Render’s assigned port, or 3000 locally
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
