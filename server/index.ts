import express from "express";
import cors from "cors";

const app = express();

const CLIENT_PATH = process.env.CLIENT_PATH || "http://localhost:5173";
const SERVER_PORT = process.env.SERVER_PORT || 3000;

app.use(cors({
    origin: CLIENT_PATH
}));


app.get("/", (req, res) => {
    res.send("Hello from the server!");
});


app.listen(SERVER_PORT, () => {
    console.log(`Server started on port ${SERVER_PORT}!`);
});