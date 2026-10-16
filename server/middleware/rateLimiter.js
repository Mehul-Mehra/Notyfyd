import { rateLimit } from '../config/upstash.js';

export const rateLimiter = async (req,res,next) => {
    try{
        const { success } = await rateLimit.limit(req.userId);
        if(!success){
            return res.status(429).json({
                message: "Too many requests, please try again later",
            })
        }
        next();
    }
    catch(error){
        console.error("Error at rateLimiter",error);
        next(error);
    }
}