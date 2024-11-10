// external imports
const express = require('express');
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const ActivityModel = require('../models/activitylog.js');


const activityrouter = express.Router();


// Route to create a new activity
activityrouter.post('/create', async (req, res) => {
    const { userId, activity_type, description } = req.body;
    
    try {
        const newActivity = new ActivityModel({
            userId,
            activity_type,
            description
        });
        
        const savedActivity = await newActivity.save();
        res.status(201).json(savedActivity);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create activity' });
    }
});


// Route to get activities by user ID
activityrouter.get('/get', auth, async (req, res) => {
    try {
        const activities = await ActivityModel.find({ userId: req.user._id });
        res.status(200).json({
            message: true,
            activities
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve activities' });
    }
});


activityrouter.get('/get', auth, async (req, res) => {
    try {
        const activities = await ActivityModel.find({ userId: req.user._id });
        res.status(200).json({
            message: true,
            activities
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve activities' });
    }
});








module.exports = activityrouter;