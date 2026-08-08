import { Router } from 'express';

import protectRoute from '../middleware/protectRoute.js';
import { getAllNotes, createNote, getNoteById, updateNote, deleteNote } from '../controllers/notesControllers.js';

const notesRouter = Router();

notesRouter.get('/',protectRoute,getAllNotes);
notesRouter.get('/:id',protectRoute,getNoteById);
notesRouter.post('/',protectRoute,createNote);
notesRouter.put('/:id',protectRoute,updateNote);
notesRouter.delete('/:id',protectRoute,deleteNote);

export default notesRouter;