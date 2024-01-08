import "dotenv/config";
import env from "./util/validateEnv";
import mongoose from "mongoose";
import express from "express";
const app = express();

//Endpoint for an http get request
app.get("/", (req, res) => {
    res.send("Hello, World");
});

const port = env.PORT;

//Connect mongoose to MongoDB
mongoose
    .connect(env.MONGO_CONNECTION_STRING)
    .then(() => {
        console.log("Mongoose connected");
        app.listen(port, () => {
            console.log("Server running on port " + port);
        });
    })
    .catch(console.error);
