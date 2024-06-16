// external imports
const express = require('express');
const mongoose = require('mongoose');
const upload = require('../multer');
const fs= require('fs');

// internal Imports
const Item = require('../models/Items')



const postrouter = express.Router();

postrouter.post('/', upload.single('image'),(req, res) => {
    console.log(req.body);
    console.log('Request Type:', req.method);
    
    const newItem = Item({

        itemName:req.body.itemName,
        category:req.body.category ,
        division:req.body.division ,
        district:req.body.district,
        location:req.body.location, 
        details: req.body.details,
        foundDateTime:req.body.foundDateTime, 
        rewardAmount:req.body.rewardAmount ,
        postType:req.body.postType,
        image:{
            data:fs.readFileSync("./uploads/"+req.file.filename),
            contentType:'image',

        }
});
    newItem.save().then(() => {
        console.log("NewLost/Found Items added to db")
        res.status(200).json({ message: 'Data received successfully' });


    }).catch(err => { 
        console.error("New item addition failed", err); // Log the error
        res.status(500).json({ message: 'Failed to add item', error: err.message }); })
});

postrouter.get('/', async (req, res) => {
    const response = await Item.find();
    res.status(200).send(response);
});

module.exports = postrouter;