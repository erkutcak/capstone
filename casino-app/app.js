import React, { useEffect } from 'react';
import express from "express";
import prisma from "./lib/prisma";

const App = () => {
    useEffect(() => {
        const app = express();
        app.use(express.json());

        const PORT = process.env.PORT || 3000;

        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    }, []);
    
    useEffect(() => {
        const getUsers = async () => {
        try {
            const response = await fetch('/users');
            const users = await response.json();
            console.log(users);
        } catch (error) {
            console.error('Something went wrong:', error);
        }
        };
    
        getUsers();
    }, []);
};

export default App;
