import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/health-check", (req, res) => {
    return res.send("Hello there");
});

app.listen(3000);
