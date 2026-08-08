import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router';
import toast from 'react-hot-toast';

import api from '../lib/axios';
import { useAuth } from '../context/AuthContext.jsx'

const LoginCard = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try{
            const res = await login(email, password);
            toast.success(res.message);
            navigate('/home');
        }
        catch(error){
            toast.error(error.response?.data?.message || 'Something went wrong');
        }
    }

    return (
        <div className="h-[40vh] w-[25vw] bg-secondary-content py-1 gap-2 border rounded-2xl flex flex-col items-center">
            <span className="text-4xl font-bold">Sign In</span>
            <div className="w-9/10 flex flex-col text-lg gap-0.5">
                <label htmlFor="email">Email</label>
                <input 
                type="email" 
                placeholder="Enter email"
                onChange={(e) => {setEmail(e.target.value)}}
                className="bg-neutral p-1 rounded-md"
                />
            </div>
            <div className="w-9/10 flex flex-col text-lg gap-0.5">
                <label htmlFor="password">Password</label>
                <input 
                type="password" 
                placeholder="Enter password"
                onChange={(e) => {setPassword(e.target.value)}}
                className="bg-neutral p-1 rounded-md"
                />
            </div>
            <button onClick={handleSubmit} className="btn mt-2">Log In</button>
            <span>Don't have an account? <NavLink to="/signup" className="underline">Sign up</NavLink></span>
        </div>
    )
}

export default LoginCard