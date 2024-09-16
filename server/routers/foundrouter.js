//Externel imports
const express=require('express');
const mongoose=require('mongoose');
const upload= require('../multer');
const fs=require('fs');
const path=require('path');

//Internal imports
const Item=require('../models/Items');

// Initialize Router
const foundrouter=express.Router();

//POST Route to add found Item
foundrouter.post('/',upload.single('image'),(req,res)=>{
    console.log(req.body);
    console.log('Request Type:',req.method);
    console.log(req.file.filename);

     // Check if file was uploaded
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }



    const newItem=new Item({
        itemName:req.body.itemName,
        category:req.body.category,
        division:req.body.division,
        district:req.body.district,
        location:req.body.location,
        details: req.body.details,
        foundDateTime:req.body.foundDateTime, //Date when item was found
        rewardAmount:req.body.rewardAmount, //if there is a reward for claiming
        postType:'found', // this distinguishes between lost and found
        image:{
            data:fs.readFileSync(path.join(__dirname,"../uploads/"+req.file.filename)),
            contentType:req.file.mimetype, //Ensure mimetype is correct
        }
    });


    newItem.save()
    .then(()=>{
        console.log("Found item added to the database");
        res.status(200).json({message:'Found item added successfully'});
    })
    .catch(err=>{
        console.error("Failed to add Found Item",err);
        res.status(500).json({message:'Failed to add found item',erro:err.message});
    });
});

//GET Route to retrieve All Found item
foundrouter.get('/',async(req,res)=>{
    try {
        const foundItems= await Item.find({postType:'found'}); //fetch only found items
        res.status(200).json(foundItems);
    } catch (error) {
        console.error("Error fetching found items",err);
        res.status(500).json({message:'Failed to fetch found items',error:err.message});
    }
});

module.exports=foundrouter;
