import { Router } from 'express';

import protectRoute from '../middleware/protectRoute.js';
import { addCollaborator, removeCollaborator } from '../controllers/collaboratorControllers.js';

const collaboratorRouter = Router({ mergeParams: true });

collaboratorRouter.post('/',protectRoute,addCollaborator);
collaboratorRouter.delete('/:collaboratorId',protectRoute,removeCollaborator);

export default collaboratorRouter;