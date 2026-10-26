import userSchema from "../../utils/z.js";
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();



const app = express();

app.use(express.json());
let user = [];
let todos = [];

async function signup(req, res) {
    const result = userSchema.safeParse(req.body);
    const password = result.data.password;
    const name = result.data.name;
    const saltRounds = 5;
    console.log(req.body)
    // const userExists = user.find(user => user.username === result.data.username);

    // if(!userExists){
    //     const token = jwt.sign({
    //         username: result.data.username
    //     },"Deepank@1234")

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newuser = await prisma.user.create({
            data: {
                name,
                password: hashedPassword,
            },
        });
        return res.status(200).json({
            token: token,
            newuser,
        });
    } catch (error) {
        res.status(500).json({ message: "Error hashing password" });
    }
}
// else{
//     res.status(200).send({
//         message:"user already exist"
//     })
// }

// }

async function signin(req, res) {
    try {
        const use = req.body;

        const result = userSchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                success: false,
                errors: result.error.issues.map((issue) => ({
                    field: issue.path.join("."),
                    messages: issue.message,
                })),
            });
        }

        const client = user.find(
            (user) => user.username === result.data.username
        );
        const storedPassword = client.password;

        const isMatch = await bcrypt.compare(
            result.data.password,
            storedPassword
        );

        if (isMatch) {
            const token = jwt.sign(
                {
                    username: use.username,
                },
                "Deepank@1234"
            );
            res.status(200).json({
                token: token,
            });
        }
    } catch (error) {
        res.status(500).json({ message: "error during log in" });
    }
}

function pushTodo(req, res) {
    const username = req.user;
    const task = req.body.todo;
    todos.push({ username, task });

    res.status(200).json({
        message: "done",
    });
}

function pullTodo(req, res) {
    const username = req.user;
    const userNote = todos.filter((note) => note.username === username);

    res.status(200).json({
        notes: userNote,
    });
}

// function fileConnect(req,res){
//     res.sendFile("/Users/deepankbisht/Desktop/coder/winterarc/fullstack/src/index.html");
// }

// function UserSignup(req,res){
//     res.sendFile("/Users/deepankbisht/Desktop/coder/winterarc/fullstack/src/signup.html");
// }

// function UserSignin(req,res){
//     res.sendFile("/Users/deepankbisht/Desktop/coder/winterarc/fullstack/src/signin.html");
// }

export { signup, signin, pushTodo, pullTodo };
