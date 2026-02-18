const express = require('express');
const app = express();
const cors = require('cors');
const userModel = require('./model/schema.model');
app.use(cors());
app.use(express.json());

app.post('/register', async (req, res) => {
    try {
        const { username, msg } = req.body;

        if (!msg) {
            return res.status(400).json({ message: "msg is required" });
        }

        await userModel.create({ username, msg });

        res.status(201).json({ message: "Saved successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

app.get('/show', async (req, res) => {
    try {
        const users = await userModel.find({});
        res.json(users);   // MUST send array
    } catch (error) {
        res.status(500).json({ message: "Error fetching users" });
    }
});


module.exports = app;