import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import noteRoutes from "./routes/notes";
import morgan from "morgan";

const app = express();

// logging package
app.use(morgan("dev"));

//enables the use json with express
app.use(express.json());

//Endpoint for an http get request
app.use("/api/notes", noteRoutes);

app.use((req, res, next) => {
    next(Error("Endpoint not found"));
});

// instead of using a try catch in app function use express error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    res.status(500).json({ errorMessage });
});

export default app;
