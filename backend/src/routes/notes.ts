import express from "express";
// * means i want all funcitons in that controller file
import * as NotesController from "../controllers/notes";

//helps add endpoint to the intanct of express in app.ts because be do not want to make another instance
const router = express.Router();

router.get("/", NotesController.getNotes);

router.get("/:noteId", NotesController.getNote);

router.post("/", NotesController.createNote);

router.patch("/:noteId", NotesController.updateNote);

router.delete("/:noteId", NotesController.deleteNote);

export default router;
