import mongoose from 'mongoose'

const liveNoteSchema = new mongoose.Schema(
    {
    title: {
        type: String,
        required: true,
        maxlength: 100,
        trim: true
    },
    content: {
        type: String,
        maxlength: 10000,
        trim: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: "User"
    },
    collaborators: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        role: {
            type: String,
            enum: ["owner","editor"],
            default: "editor"
        }
    }]
    },
    {timestamps: true}
);

const LiveNote = mongoose.model("LiveNote",liveNoteSchema);

export default LiveNote;