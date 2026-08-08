import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import User from '../models/User.js'

dotenv.config();

export const registerUser = async (req,res) => {
    try{
        const {username, email, password} = req.body;

        // Existing user check
        const existingUser = await User.findOne({email: email});
        if(existingUser){
            return res.status(409).json({message: 'A user with the same email already exists. Please try logging in'});
        }

        // Registering user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const newUser = await new User({username: username, email: email, password: hashedPassword});
        await newUser.save();
        res.status(201).json({
            message: 'Registered successfully',
            user: {
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email
            }
        });
    }
    catch(error){
        console.error('Error at registerUser controller',error);
        res.status(500).json({message: 'Internal server error'});
    }
}

export const loginUser = async (req,res) => {
    try{
        const {email, password} = req.body;

        // Checking req.body content
        if(!email || !password){
            return res.status(400).json('Email and password are required');
        }

        // Verifying user
        const existingUser = await User.findOne({email: email}).select('+password');
        if(!existingUser || !(await bcrypt.compare(password,existingUser.password))){
            return res.status(401).json({message: 'Invalid email or password'});
        }

        const payload = {
            'sub': existingUser._id.toString()
        }
        
        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {
                expiresIn: '30d'
            }
        )
        
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 30 * 24 * 60 * 60 * 1000    
        });

        res.status(200).json({
            message: 'Login successfull',
            user:{
                _id: existingUser._id,
                username: existingUser.username,
                email: existingUser.email,
            }
        });
    }
    catch(error){
        console.error('Error at loginUser controller',error);
        res.status(500).json({message: 'Internal server error'});
    }
}

export const getMe = async (req,res) => {
    try{
        const userId = req.userId;
        const user = await User.findById(userId).select("-password");

        if(!user){
            res.status(404).json({message: 'User not found'});
        }

        res.status(200).json({user});
    }
    catch(error){
        console.error('Error at getMe controller',error);
        res.status(500).json({message: 'Internal server error'});
    }
}

export const logoutUser = (req,res) => {
    try{
        res.clearCookie('token',{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax'
        });

        res.status(200).json({message: 'Logged out successfully'});
    }
    catch(error){
        console.error('Error at logoutUser controller',error);

        res.status(500).json({message: 'Internal server error'});
    }
}