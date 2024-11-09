// external imports
const express = require('express');
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const MessageModel = require('../models/message');

const messagerouter = express.Router();


// POST route to send a message
messagerouter.post('/send', async (req, res) => {
    const { userId,itemName, message, status } = req.body;

    try {
        const newMessage = await MessageModel.create({ userId,itemName, message, status });
        res.status(201).json({
            success: true,
            message: 'Message sent successfully!',
            data: newMessage,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Failed to send message.',
            error: error.message,
        });
    }
});

// GET route to fetch messages for the authenticated user
messagerouter.get('/get', auth, async (req, res) => {
    const userId = req.user._id;
    
    try {
        const messages = await MessageModel.find({userId});

        res.status(200).json({
            success: true,
            messages, 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch messages.',
            error: error.message,
        });
    }
});

module.exports = messagerouter;
