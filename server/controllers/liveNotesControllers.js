import mongoose from 'mongoose'

import LiveNote from '../models/LiveNote.js'

export const getAllLiveNotes = async (req,res) => {
    try{
        const userId = req.userId;
        const liveNotes = await LiveNote.find({"collaborators.user": userId});
        res.status(200).json(liveNotes);
    }
    catch(error){
        console.error("Error at getAllLiveNote controller",error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const getLiveNoteById = async (req,res) => {
    try{
        const userId = req.userId; 
        
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(400).json({
                message: "Invalid note ID",
            });
        }
        
        const noteById = await LiveNote.findOne({
            "collaborators.user": userId,
            _id: req.params.id
        });

        if(!noteById){
            return res.status(404).json({message: "Live Note not found"});
        }

        res.status(200).json(noteById);
    }
    catch(error){
        console.error("Error at getLiveNoteById controller",error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const createLiveNote = async (req,res) => {
    try{
        let { title } = req.body;
        const userId = req.userId;

        title = title?.trim();

        if(!title){
            return res.status(400).json({message: "Title is required"});
        }

        const existingLiveNote = await LiveNote.findOne({title: title, owner: userId});
        if(existingLiveNote){
            return res.status(409).json({message: "Live Note with the same title already exists"});
        }

        const newLiveNote = new LiveNote({
            title: title,
            owner: userId,
            collaborators: [{user: userId, role: "owner"}]
        });

        await newLiveNote.save();
        res.status(201).json({message: "Live Note created successfully"});
    }
    catch(error){
        console.error("Error at createLiveNote controller",error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const updateLiveNote = async (req,res) => {
    try{
        const userId = req.userId;
        const noteId = req.params.id;
        let {title, content} = req.body;

        title = title.trim();
        content = content.trim();

        if(!title){
            return res.status(400).json({message: "Title is required"});
        }

        if(!mongoose.Types.ObjectId.isValid(noteId)){
            return res.status(400).json({
                message: "Invalid note ID"
            });
        }

        const updatedLiveNote = await LiveNote.findOneAndUpdate(
            {
                "collaborators.user": userId,
                _id: noteId
            },
            {
                title: title,
                content: content
            },
            {
                returnDocument: 'after'
            }
        );

        if(!updatedLiveNote){
            return res.status(400).json({message: "Note not found"});
        }

        res.status(200).json({
            message: 'Note updated successfully',
            note: updatedLiveNote
        });
    }
    catch(error){
        console.error("Error at updateLiveNote controller",error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const deleteLiveNote = async (req,res) => {
    try{
        const userId = req.userId;
        const noteId = req.params.id;
        
        if(!mongoose.Types.ObjectId.isValid(noteId)){
            return res.status(400).json({message: "Invalid live note ID"});
        }

        const deletedNote = await LiveNote.findOneAndDelete({
            "collaborators.user": userId,
            _id: noteId
        });
        if(!deletedNote){
            return res.status(404).json({message: "Live note not found"});
        }
        res.status(200).json({message: "Live note deleted successfully"});
    }
    catch(error){
        console.error("Error at deleteLiveNote controller",error);
        res.status(500).json({message: "Internal server error"});
    }
}