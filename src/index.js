import express from "express";
import cors from "cors";


import router from "./routes/user.js";

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

app.use("/user",router);

app.listen(3000,()=>{
    console.log(`Listening at port 3000`)
});
