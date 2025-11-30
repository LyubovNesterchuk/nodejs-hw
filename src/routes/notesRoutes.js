import { Router } from "express";
import { celebrate } from "celebrate";

import { authenticate } from "../middleware/authenticate.js";
import { getAllNotes, getNoteById, createNote, updateNote, deleteNote } from "../controllers/notesController.js";
import { getAllNotesSchema, noteIdSchema, createNoteSchema, updateNoteSchema } from "../validations/notesValidation.js";

const router = Router();

router.use("/api/notes", authenticate);

router.get("/api/notes", celebrate(getAllNotesSchema), getAllNotes);
router.get("/api/notes/:noteId", celebrate(noteIdSchema), getNoteById);
router.post("/api/notes", celebrate(createNoteSchema), createNote);
router.patch("/api/notes/:noteId", celebrate(updateNoteSchema), updateNote);
router.delete("/api/notes/:noteId", celebrate(noteIdSchema), deleteNote);

export default router;

