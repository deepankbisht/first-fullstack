
import {z} from "zod";

const userSchema = z.object({
    name: z.string()
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

export default userSchema;