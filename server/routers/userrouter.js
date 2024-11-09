// external imports
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// internal Imports
const User = require('../models/users'); //use schema and model
const auth = require('../middleware/auth')


const userrouter = express.Router();

// user details get

userrouter.get('/getalluser', async (req, res) => {
    const response = await User.find();
    res.status(200).send(response);


});

// ========================user registration data post =========================

userrouter.post('/register', async (req, res) => {
    console.log(req.body);
    console.log('Request Type:', req.method);
    const salt = await bcrypt.genSalt(10);
    const hashpass = await bcrypt.hash(req.body.password, salt);

    const newUser = User({
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        password: hashpass,
        role: req.body.email==='ashraful52038@gmail.com' ? 'admin' : 'user'  // Auto-assign admin role for a specific email
    });
    newUser.save().then(() => {
        console.log("NewLost/Found Users added to db")
        res.status(200).json({ message: 'Data received successfully' });


    }).catch(err => {
        console.error("New user addition failed", err); // Log the error
        res.status(500).json({ message: 'Failed to add user', error: err.message });
    })
});





// ==================================== Login ==============4=================


userrouter.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        
        const user = await User.findOne({ email }).select('-password');
        if (!user) {
            return res.status(400).send({ message: "User doesn't exist" });
        }

      
        const userWithPassword = await User.findOne({ email });

   
        const matchPass = await bcrypt.compare(password, userWithPassword.password);
        if (!matchPass) {
            return res.status(400).send({ message: "Wrong Password" });
        }

        // Generate JWT token
        const authToken = jwt.sign({user}, process.env.JWT_SECRET);

        
        res.cookie('authToken', authToken, { httpOnly: true, secure: true });

        res.status(200).json({
            token: authToken,
            user  
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// logout
userrouter.get('/logout',auth, (req, res) => {

    res.clearCookie('authToken', { httpOnly: true, secure: true });
    
 
    res.status(200).send({ message: "Logged out successfully" });
});



// Get User

userrouter.get('/getuser',auth, async (req, res) => {
    const userId = req.user._id;

try {
    const user = await User.findById(userId).select('-password');
    res.status(200).send(user);
    console.log(user);
} catch (error) {
    console.log(error.message);
}
   


});







module.exports = userrouter;