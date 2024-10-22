import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Adjust if your backend runs on a different port

// Function to sign up a new user
export const signup = async (userData) => {
    return await axios.post(`${API_URL}/signup`, userData);
};

// Function to log in a user
export const login = async (userData) => {
    return await axios.post(`${API_URL}/login`, userData);
};

// Function to get remedies (protected route)
export const getRemedies = async (token) => {
    return await axios.get(`${API_URL}/remedies`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

// Function to add a new remedy (protected route)
export const addRemedy = async (remedyData, token) => {
    return await axios.post(`${API_URL}/remedies`, remedyData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
