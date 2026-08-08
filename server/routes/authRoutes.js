import { Router } from 'express'

import protectRoute from '../middleware/protectRoute.js'
import { registerUser, loginUser, getMe, logoutUser } from '../controllers/authControllers.js'

const authRouter = Router();

authRouter.post('/signup',registerUser);
authRouter.post('/login',loginUser);
authRouter.get('/me',protectRoute,getMe);
authRouter.post('/logout',logoutUser);

export default authRouter;