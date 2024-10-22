// import React, { createContext, useState, useEffect } from 'react';
// import { login, signup } from '../services/api';

// export const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [token, setToken] = useState(localStorage.getItem('token'));

//     useEffect(() => {
//         if (token) {
//             localStorage.setItem('token', token);
//         } else {
//             localStorage.removeItem('token');
//         }
//     }, [token]);

//     const handleSignup = async (userData) => {
//         const response = await signup(userData);
//         setToken(response.data.access_token);
//         setUser(userData.username); // Or any user info you want to save
//     };

//     const handleLogin = async (userData) => {
//         const response = await login(userData);
//         setToken(response.data.access_token);
//         setUser(userData.username);
//     };

//     const logout = () => {
//         setToken(null);
//         setUser(null);
//     };

//     return (
//         <AuthContext.Provider value={{ user, token, handleSignup, handleLogin, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export default AuthProvider;

import React, { createContext, useState, useEffect, useContext } from 'react';
import { login, signup } from '../services/api';

export const AuthContext = createContext();

// Create a custom hook to use the AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);

    const handleSignup = async (userData) => {
        const response = await signup(userData);
        setToken(response.data.access_token);
        setUser(userData.username); // Or any user info you want to save
    };

    const handleLogin = async (userData) => {
        const response = await login(userData);
        setToken(response.data.access_token);
        setUser(userData.username);
    };

    const logout = () => {
        setToken(null);
        setUser(null);
    };

     // Add getToken function
     const getToken = () => {
        return token; // Return the current token
    };

    return (
        <AuthContext.Provider value={{ user, token, handleSignup, handleLogin, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
