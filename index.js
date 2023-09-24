import express from "express";
import "dotenv/config";
import mongoose from "mongoose";

const app = express();

const Port = process.env.PORT;

const DB_CONN = () =>{
    mongoose.connect(process.env.DB_URL).then(() => {
        console.log("Database is connected");
    }).catch((err) =>{
        console.log(err);
    })
}

app.listen(Port, () => {
    DB_CONN();
  console.log(`Server listen on port ${Port}`);
});
