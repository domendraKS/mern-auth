import express, { json } from "express";
import "dotenv/config";
import mongoose from "mongoose";
import userRouter from "./routers/user.route.js";
import authRouter from "./routers/auth.route.js";
import cors from "cors";

const app = express();
app.use(json());

const corsOptions = {
    origin: true,
    credentials: true
}

app.use(cors(corsOptions))

app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)

const DB_CONN = () =>{
    mongoose.connect(process.env.DB_URL).then(() => {
        console.log("Database is connected");
    }).catch((err) =>{
        console.log(err);
    })
}

const Port = process.env.PORT;
app.listen(Port, () => {
  DB_CONN();
  console.log(`Server listen on port ${Port}`);
});

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message =  err.message || 'Internal server error';
    return res.status(statusCode).json({
        success: false,
        error: message,
        statusCode: statusCode,
    })
})