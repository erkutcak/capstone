import React, { useEffect } from 'react';
import express from "express";
import prisma from "./lib/prisma";

const App = () => {
    const app = express();
    
    useEffect(() => {
        app.use(express.json());

        const PORT = process.env.PORT || 5555;

        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    }, []);
    
    app.get("/users", async (req, res) => {
        try {
        const users = await prisma.user.findMany()
    
        res.json(users)
        } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
        })
        }
    })
};

export default App;
