import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        trim: true,
        minlength:3,
        maxlength:30
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"]
    },
    password:{
        type: String,
        required: true,
        select: false,
        minlength: 6
    }
},{ timestamps: true });

const User = mongoose.model('User',userSchema);

export default User;