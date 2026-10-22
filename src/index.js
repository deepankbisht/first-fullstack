import express from "express";
import cors from "cors";
import {success, z} from "zod";
import { is } from "zod/locales";

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

const userSchema = z.object({
    username: z.string()
                .min(8, "Password must be at least 8 characters")
                .max(20, "Password must not exceed 30  characters"),
    password: z.string()
                .min(8, "Password must be at least 8 characters")
                .max(30, "Password must not exceed 30  characters")
                .regex(/[A-Z]/, "Must contain an uppercase letter")
                .regex(/[a-z]/,"Must contain a lowercase letter")
                .regex(/[0-9]/, "Must contain a number")
                .regex(/[^A-Za-z0-9]/, "Must contain a special character")
})

let ans = [];

app.post("/signup", (req, res) => {
    const result = userSchema.safeParse(req.body);

    if(!result.success){
        return res.status(400).json({
            success:false,
            errors: result.error.issues.map((issue)=>({
                field: issue.path.join("."),
                messages: issue.message
            }))
        })
    }

    ans.push(result.data);
    return res.status(200).json({
        success: true,
        message: "Signup Done"
    })
});

app.post("/signin",(req,res)=>{
    const user = req.body;
    let authenticated = false;
    for(const use of ans){
        if(user.username===use.username && user.password===use.password) authenticated=true;
    } 
    if(authenticated){
        res.status(200).json({
            msg : "sign-in done"
        })
    }else{
        res.status(400).json({
            msg:"Please sign-up first"
        })
    }
})

app.listen(3000);
