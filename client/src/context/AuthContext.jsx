import { useState, createContext, useContext, useEffect } from "react";

import api from '../lib/axios.js'

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const register = async (username, email, password) => {
        const res = await api.post('/auth/signup',
            {username, email, password},
            {withCredentials: true}
        );

        return res.data
        // Didn't create a catch block so the frontend catches the error directly from axios
    }

    const login = async (email, password) => {
        const res = await api.post('/auth/login',
            {email,password},
            {withCredentials:true}
        );

        setUser(res.data.user);

        return res.data;
    }

    const logout = async () => {
        const res = await api.post('/auth/logout',
            {},
            {withCredentials: true}
        );

        setUser(null);

        return res.data;
    }

    useEffect(() => {
        const getUser = async () => {
            try{
                const res = await api.get('/auth/me',{
                    withCredentials: true
                });
                
                setUser(res.data.user);
            }
            catch(error){
                setUser(null);
            }
            finally{
                setLoading(false);
            }
        };

        getUser();
    },[]);

    return(
        <AuthContext.Provider value={{user, setUser, loading, register, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }
    return context;
}