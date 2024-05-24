import dotenv from "dotenv";
import express from "express";
import env from "env-var";

dotenv.config();
const PORT = env.get('PORT').required().asPortNumber()

const app = express();
app.use(express.json());

console.log(PORT)
console.log(process.env.PORT)
console.log("Hell-o-ween");

// Routes
//app.use('/auth', authRoutes)
// Auth
// User

export default app;
