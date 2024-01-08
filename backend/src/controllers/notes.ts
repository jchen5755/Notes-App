import { RequestHandler } from "express";
import NoteModel from "../models/note";

//adding RequestHandler helps define the types of req, res, and next without having to import them individually (i.e. req: Request)
export const getNotes: RequestHandler = async (req, res, next) => {
    try {
        // async required for the await and await acts like the then catch in server.ts
        const notes = await NoteModel.find().exec();
        res.status(200).json(notes);
    } catch (error) {
        next(error);
    }
};
