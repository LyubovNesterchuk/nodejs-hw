import express from "express";
import cors from "cors";
import pino from "pino-http";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT ?? 3030;

app.use(express.json());
app.use(cors());
app.use(pino());

app.get("/", (req, res) => {
  res.status(200).json({
    "message": "This my route",
  });
});

app.get('/test-error', (req,res) => {
  throw new Error("Simulated server error");
});

app.get("/notes", (req, res) => {
  res.status(200).json({
    "message": "Retrieved all notes"
  });
});

app.get("/notes/:noteId", (req, res) =>{
  const {noteId} = req.params;
  res.status(200).json({
    "message": `Retrieved note with ID: ${noteId}`
  });
});

app.use((req,res)=>{
  res.status(404).json({
    "message": "Route not found"
  });
});

app.use((err, req, res, next) => {
  res.status(500).json({
   "message": "Simulated server error"
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});


