import mongoose from 'mongoose'

import User from '../models/User.js'
import LiveNote from '../models/LiveNote.js'

export const addCollaborator = async (req,res) => {
    try{
        const userId = req.userId;
        const noteId = req.params.id;
        let { requestedUsername, role } = req.body; 
        requestedUsername = requestedUsername?.trim();
        role = role?.trim();

        // Required fields
        if(!requestedUsername || !role){
            return res.status(400).json({message: "Username and role are required"});
        }

        if(!["editor", "viewer"].includes(role)){
            return res.status(400).json({message: "Invalid role"});
        }

        // Checking ownership
        const liveNote = await LiveNote.findById(noteId);
        if(!liveNote){
            return res.status(404).json({message: "Live note not found"});
        }
        if(liveNote.owner.toString() !== userId.toString()){
            return res.status(401).json({message: "Not authorised for this action"});
        }

        // Find collaborator
        const reqUser = await User.findOne({username: requestedUsername});
        if(!reqUser){
            return res.status(404).json({message: "User not found"});
        }

        // Check if already a collaborator
        const collaborator = liveNote.collaborators.some(
            c => c.user.toString() === reqUser._id.toString() 
        ) 
        if(collaborator){
            return res.status(400).json({message: "User is already a collaborator"});
        }

        // Add collaborator
        liveNote.collaborators.push({
            user: reqUser._id,
            role: role
        })
        await liveNote.save();

        res.status(200).json({message: `${requestedUsername} added as ${role}`});
    }
    catch(error){
        console.error("Error at addCollaborator controller",error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const removeCollaborator = async (req,res) => {
    try{
        const userId = req.userId;
        const noteId = req.params.id;
        const collaboratorId = req.params.collaboratorId;
        
        // Checking ownership
        let liveNote = await LiveNote.findById(noteId);
        if(!liveNote){
            return res.status(404).json({message: "Live note not found"});
        }
        if(liveNote.owner.toString() !== userId.toString()){
            return res.status(401).json({message: "Not authorised for this action"});
        }

        // Check if already a collaborator
        const collaborator = liveNote.collaborators.find(
            c => c.user.toString() === collaboratorId.toString() 
        ) 
        if(!collaborator){
            return res.status(404).json({message: "User is not a collaborator"});
        }

        if(collaborator.role === "owner"){
            return res.status(400).json({message: "Cannot remove owner of the live note"});
        }

        // Remove collaborator
        liveNote.collaborators = liveNote.collaborators.filter(
            c => c.user.toString() !== collaboratorId.toString()
        )
        await liveNote.save();

        res.status(200).json({message: "Collaborator removed"});
    }
    catch(error){
        console.error("Error at addCollaborator controller",error);
        res.status(500).json({message: "Internal server error"});
    }
}