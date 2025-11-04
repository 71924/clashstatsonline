import express from "express";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// replace this with your real Clash Royale API key
const API_KEY = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjIxZjYyYzY0LWI0MzYtNDBhNC04MTU3LTkxMjM3NWVhYzcwMyIsImlhdCI6MTc2MjIxMTY1Nywic3ViIjoiZGV2ZWxvcGVyLzhhYmZjZTNlLWQyN2ItNzAwOC03NzFhLTVlODNjODcyMjA0NyIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIxNzQuOTIuMTc3LjEyOSJdLCJ0eXBlIjoiY2xpZW50In1dfQ.c26HFCgXYZ5-42ySaogjt0ppfWcypyYt4fhLkzOal1bqsJ7DIj_A27oH67g59LacVjefKlJzxRA0UJYcydh1SQ";

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

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
