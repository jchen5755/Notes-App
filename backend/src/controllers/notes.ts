import { RequestHandler } from "express";
import NoteModel from "../models/note";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { assertIsDefined } from "../util/assertIsDefined";

//adding RequestHandler helps define the types of req, res, and next without having to import them individually (i.e. req: Request)
export const getNotes: RequestHandler = async (req, res, next) => {
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);

        // async required for the await and await acts like the then catch in server.ts
        const notes = await NoteModel.find({
            userId: authenticatedUserId,
        }).exec();
        res.status(200).json(notes);
    } catch (error) {
        next(error);
    }
};

//post to DB using express
export const getNote: RequestHandler = async (req, res, next) => {
    const authenticatedUserId = req.session.userId;
    const noteId = req.params.noteId;
    try {
        assertIsDefined(authenticatedUserId);
        if (!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(400, "Invalid note id");
        }
        const note = await NoteModel.findById(noteId).exec();

        if (!note) {
            throw createHttpError(404, "Note not found");
        }

        if (!note.userId.equals(authenticatedUserId)) {
            throw createHttpError(401, "You cannot access this note");
        }

        res.status(200).json(note);
    } catch (error) {
        next(error);
    }
};

// similar to types
//but genernally use interfaces when possible
interface CreateNoteBody {
    title?: string;
    text?: string;
}

//post to DB using express
export const createNote: RequestHandler<
    unknown,
    unknown,
    CreateNoteBody
> = async (req, res, next) => {
    const title = req.body.title;
    const text = req.body.text;
    const authenticatedUserId = req.session.userId;
    try {
        assertIsDefined(authenticatedUserId);
        if (!title) {
            throw createHttpError(400, "Note must have a title");
        }

        const newNote = await NoteModel.create({
            userId: authenticatedUserId,
            title: title,
            text: text,
        });

        res.status(201).json(newNote);
    } catch (error) {
        next(error);
    }
};

interface updateNoteParams {
    noteId: string;
}

interface updateNoteBody {
    title?: string;
    text?: string;
}

export const updateNote: RequestHandler<
    updateNoteParams,
    unknown,
    updateNoteBody
> = async (req, res, next) => {
    const noteId = req.params.noteId;
    const newTitle = req.body.title;
    const newText = req.body.text;
    const authenticatedUserId = req.session.userId;
    try {
        assertIsDefined(authenticatedUserId);
        if (!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(400, "Invalid note id");
        }

        if (!newTitle) {
            throw createHttpError(400, "Note must have a title");
        }

        const note = await NoteModel.findById(noteId).exec();
        if (!note) {
            throw createHttpError(404, "Note not found");
        }

        if (!note.userId.equals(authenticatedUserId)) {
            throw createHttpError(401, "You cannot access this note");
        }

        note.title = newTitle;
        note.text = newText;
        const updatedNote = await note.save();

        res.status(200).json(updatedNote);
    } catch (error) {
        next(error);
    }
};

export const deleteNote: RequestHandler = async (req, res, next) => {
    const noteId = req.params.noteId;
    const authenticatedUserId = req.session.userId;
    try {
        assertIsDefined(authenticatedUserId);
        if (!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(400, "Invalid note id");
        }

        const note = await NoteModel.findById(noteId).exec();
        if (!note) {
            throw createHttpError(404, "Note not found");
        }

        if (!note.userId.equals(authenticatedUserId)) {
            throw createHttpError(401, "You cannot access this note");
        }

        await note.deleteOne();

        //use sendStatus because we are not including a json response
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
};
