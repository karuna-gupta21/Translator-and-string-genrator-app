// server.js
import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/detect", async (req, res) => {
  try {
    const response = await axios.post(
      "https://libretranslate.com/detect",
      req.body
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/translate", async (req, res) => {
  try {
    const response = await axios.post(
      "https://libretranslate.com/translate",
      req.body
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
