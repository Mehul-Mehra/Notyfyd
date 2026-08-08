import mongoose from 'mongoose';

import Note from '../models/Note.js';

export const getAllNotes = async (req,res) => {
    try{
        const userId = req.userId;
        const notes = await Note.find({user: userId});
        res.status(200).json(notes);
    } 
    catch(error){
        console.error('Error at getAllNotes controller',error);
        res.status(500).json({message:'Internal server error'});
    }
};

export const getNoteById = async (req,res) => {
    try{
        const userId = req.userId;

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid note ID",
            });
        }

        const noteById = await Note.findOne({
            _id: req.params.id,
            user: userId
        });
        if(!noteById){
            return res.status(404).json({message: "Note not found"});
        }
        res.status(200).json(noteById);
    }
    catch(error){
        console.error("Error in getNoteById controller",error);
        res.status(500).json({message: "Internal server error"});
    }
};

export const createNote = async (req,res) => {
    try{
        let {title, content} = req.body;
        const userId = req.userId;

        title = title?.trim();
        content = content?.trim();

        if(!title || !content){
            return res.status(400).json({message: 'Title and content are required'});
        }
        
        const existingNote = await Note.findOne({title: title, user:userId});
        if(existingNote){
            return res.status(409).json({message: "A note with the same title already exists"});
        }

        const newNote = new Note({
            title: title, 
            content: content, 
            user: userId
        });
        await newNote.save();
        res.status(201).json({message:'Note created successfully'});
    }
    catch(error){
        console.error('Error at createNote controller',error);
        res.status(500).json({message:'Internal server error'});
    }
};

export const updateNote = async (req,res) => {
    try{
        let {title, content} = req.body;
        title = title?.trim();
        content = content?.trim();

        if(!title || !content){
            return res.status(400).json({message: 'Title and content are required'});
        }

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid note ID",
            });
        }

        const userId = req.userId;
        const updatedNote = await Note.findOneAndUpdate(
            {_id: req.params.id, user: userId},
            {title,content},
            {returnDocument: 'after'}
        );
        if(!updatedNote){
            return res.status(404).json({message: "Note not found"});
        }
        res.status(200).json({
            message:'Note updated successfully',
            note: updatedNote
        });
    }
    catch(error){
        console.error("Error in updateNote controller",error);
        res.status(500).json({message: "Internal server error"});
    }
};

export const deleteNote = async (req,res) => {
    try{
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid note ID",
            });
        }
        
        const userId = req.userId;
        const deletedNote = await Note.findOneAndDelete({
            _id: req.params.id,
            user: userId
        });
        if(!deletedNote){
            return res.status(404).json({message: "Note not found"});
        }
        res.status(200).json({message: "Note deleted successfully"});
    }
    catch(error){
        console.error("Error in deleteNote contoller",error);
        res.status(500).json({message: "Internal server error"});
    }
};