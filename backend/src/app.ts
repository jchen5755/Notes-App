import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import noteRoutes from "./routes/notes";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";

const app = express();

// logging package
app.use(morgan("dev"));

//enables the use json with express
app.use(express.json());

//Endpoint for an http get request
app.use("/api/notes", noteRoutes);

app.use((req, res, next) => {
    next(createHttpError(404, "Endpoint not found"));
});

// instead of using a try catch in app function use express error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMessage = "An unknown error occurred";
    let statusCode = 500;
    if (isHttpError(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({ errorMessage });
});

export default app;
