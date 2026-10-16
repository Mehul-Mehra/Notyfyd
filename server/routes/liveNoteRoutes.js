import { Router } from 'express';

import protectRoute from '../middleware/protectRoute.js';
import { getAllLiveNotes, getLiveNoteById, createLiveNote, updateLiveNote, deleteLiveNote } from '../controllers/liveNotesControllers.js';

const liveNotesRouter = Router();

liveNotesRouter.get('/',protectRoute,getAllLiveNotes);
liveNotesRouter.get('/:id',protectRoute,getLiveNoteById);
liveNotesRouter.post('/',protectRoute,createLiveNote);
liveNotesRouter.put('/:id',protectRoute,updateLiveNote);
liveNotesRouter.delete('/:id',protectRoute,deleteLiveNote);

export default liveNotesRouter;