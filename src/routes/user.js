import express from "express";
import userSchema from "../../utils/z.js";
import { signup, signin, pushTodo, pullTodo } from "../controller/user.js";
import { authMiddleware } from "../middleware/index.js";

const router = express.Router();

const app = express();
app.use(express.json());

router.post(
    "/signup",
    (req, res, next) => {
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
        next();
    },
    signup
);

router.get("/signin", signin);

router.post("/todo", authMiddleware, pushTodo);

router.get("/todo", authMiddleware, pullTodo);

// router.get("/",fileConnect);

// router.get("/signup",UserSignup);

// router.get("/signin",UserSignin);

export default router;
