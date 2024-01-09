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

//post to DB using express
export const getNote: RequestHandler = async (req, res, next) => {
    const noteId = req.params.noteId;
    try {
        const note = await NoteModel.findById(noteId).exec();
        res.status(200).json(note);
    } catch (error) {
        next(error);
    }
};

//post to DB using express
export const createNote: RequestHandler = async (req, res, next) => {
    const title = req.body.title;
    const text = req.body.text;

    try {
        const newNote = await NoteModel.create({
            title: title,
            text: text,
        });

        res.status(201).json(newNote);
    } catch (error) {
        next(error);
    }
};
