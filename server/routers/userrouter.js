// external imports
const express = require('express');
const mongoose = require('mongoose');

// internal Imports
const User = require('../models/users');


const userrouter = express.Router();


userrouter.get('/register', async (req, res) => {
    const response = await User.find();
    res.status(200).send(response);
});



userrouter.post('/register', (req, res) => {
    console.log(req.body);
    console.log('Request Type:', req.method);
    
    const newUser = User(req.body);
    newUser.save().then(() => {
        console.log("NewLost/Found Users added to db")
        res.status(200).json({ message: 'Data received successfully' });


    }).catch(err => { 
        console.error("New user addition failed", err); // Log the error
        res.status(500).json({ message: 'Failed to add user', error: err.message }); })
});

module.exports = userrouter;