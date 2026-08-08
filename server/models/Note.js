import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            maxlength: 100
        },
        content: {
            type: String,
            required: true,
            trim: true,
            maxlength: 10000
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        }
    },
    {timestamps:true}
);

const Note = mongoose.model('Note',noteSchema);

export default Note;