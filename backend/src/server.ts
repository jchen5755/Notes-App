import app from "./app";
import env from "./util/validateEnv";
import mongoose from "mongoose";

const port = env.PORT;

//Connect mongoose to MongoDB
mongoose
    .connect(env.MONGO_CONNECTION_STRING)
    .then(() => {
        // cannot use await since it is top level and then catahc id required by express
        console.log("Mongoose connected");
        app.listen(port, () => {
            console.log("Server running on port " + port);
        });
    })
    .catch(console.error);
