import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import toast from 'react-hot-toast';

import { useAuth } from '../context/AuthContext.jsx';

const SignupCard = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try{
            const res = await register(username,email,password);
            toast.success(res.message);
            navigate('/login');
        }
        catch(error){
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    }

    return (
        <div className="h-[50vh] w-[25vw] bg-secondary-content py-1 gap-2 border rounded-2xl flex flex-col items-center">
            <span className="text-4xl font-bold">Register</span>
            <div className="w-9/10 flex flex-col text-lg gap-0.5">
                <label htmlFor="username">Username</label>
                <input 
                type="text" 
                placeholder="Enter username"
                onChange={(e)=>{setUsername(e.target.value);}}
                className="bg-neutral p-1 rounded-md"
                />
            </div>
            <div className="w-9/10 flex flex-col text-lg gap-0.5">
                <label htmlFor="email">Email</label>
                <input 
                type="email" 
                placeholder="Enter email"
                onChange={(e)=>{setEmail(e.target.value);}}
                className="bg-neutral p-1 rounded-md"
                />
            </div>
            <div className="w-9/10 flex flex-col text-lg gap-0.5">
                <label htmlFor="password">Password</label>
                <input 
                type="password" 
                placeholder="Enter password"
                onChange={(e)=>{setPassword(e.target.value);}}
                className="bg-neutral p-1 rounded-md"
                />
            </div>
            <button onClick={handleSubmit} className="btn mt-2">Register</button>
            <span>Already have an account? <NavLink to="/login" className="underline">Log in</NavLink></span>
        </div>
    )
}

export default SignupCard