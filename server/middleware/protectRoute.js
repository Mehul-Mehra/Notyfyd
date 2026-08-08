import jwt from 'jsonwebtoken';
import { configDotenv } from 'dotenv';

configDotenv();

const protectRoute = (req, res, next) => {
    try{
        const token = req.cookies.token;

        if(!token){
            return res.status(401).json({message: 'Unauthorised'});
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = payload.sub;

        next();
    }
    catch(error){
        return res.status(401).json({message: 'Invalid or expired token'});
    }
}

export default protectRoute;