//Externel imports
const express=require('express');
const upload= require('../multer');
const fs=require('fs');
const path=require('path');

//Internal imports
const Found=require('../models/found');


// Initialize Router
const foundrouter=express.Router();

//POST Route to add found Item
foundrouter.post('/',upload.single('image'),async(req,res)=>{
    console.log(req.body);
    console.log('Request Type:',req.method);
    console.log(req.file.filename);

     // Check if file was uploaded
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }


    try {
          // If `itemId` is passed in the request body, check if the item exists
          const {itemId} =req.body();

          if(itemId){
            const item = await Item.findById(itemId);

            if(!item){
                return res.status(404).json({message:'Item by Found'});
            }
          }

          const newFound=new Found({
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
            },
            itemId: itemId? itemId:null //optionally link to an item
        });

        //save the new found item to the database
        await newFound.save();
        console.log('Found item successfully added to the database');
        res.status(200).json({message:'Found Item added successfully'});
    } catch (error) {
        console.error("Failed to add Found item",error);
        res.status(500).json({message:'Failed to add Found item',error:error.message});
    }
});

//GET Route to retrieve All Found item
foundrouter.get('/',async(req,res)=>{
    try {
        const foundItems= await Found.find({postType:'found'}); //fetch only found items
        res.status(200).json(foundItems);
    } catch (error) {
        console.error("Error fetching found items",error);
        res.status(500).json({message:'Failed to fetch found items',error:error.message});
    }
});

module.exports=foundrouter;
