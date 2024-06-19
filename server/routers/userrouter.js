// external imports
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// internal Imports
const User = require('../models/users'); //use schema and model
const fetchuser = require('../middleware/fetchuser')


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

userrouter.post('/login', async(req, res) => {
    console.log(req.body);
    // res.status(200).send({ message: 'Success login data' });



    const { email, password } = req.body;
    try {
        var user = await User.findOne({email});
        if (!user) {
            return res.status(400).send({ message: "User doesn't exist" })
        }

        
        
// checking hash pass == req pass
         


        const matchpass = await bcrypt.compare(password,user.password);
        console.log("is pass : "+ matchpass);
        if(!matchpass)
        {
           return res.status(400).send({ message: "Wrong Password" });
        }
       
        const data={
            user:
            {
                id: user._id
            }
        } 

    //    tokenizing ther user id ?

         const authtoken =  jwt.sign(data, process.env.JWT_SECRECT);
        res.status(200).send(authtoken);
        console.log('Auth_Token :'+authtoken);
    
    }
    catch(error)
    {
        res.status(500).send({message: error.message});
    }
    



});


// Get User

userrouter.get('/getuser',fetchuser, async (req, res) => {
    const userId = req.user.id;
    console.log("userid "+ userId);
try {
    const user = await User.findById(userId).select('-password');
    res.status(200).send(user);
    console.log(user);
} catch (error) {
    console.log(error.message);
}
   


});







module.exports = userrouter;