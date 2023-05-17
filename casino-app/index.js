const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.get('/users', async (req, res) => {
    try {
    const users = await prisma.user.findMany();
    res.json(users);
    } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
    }
});

const PORT = process.env.PORT || 5555;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});