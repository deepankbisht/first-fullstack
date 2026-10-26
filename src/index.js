import express from "express";
import cors from "cors";

import {logReqRes} from "../middleware/index.js"

import router from "../routes/user.js";

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(logReqRes("./src/a.json"));
app.use("/user",router);

app.listen(3000);
