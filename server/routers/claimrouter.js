// Externel imports
const express=require('express');
const upload =require('../multer');
const fs=require('fs');
const path=require('path');

//internal imports
const Claim=require('../models/claim');
const Item=require('../models/Items');


//Initialize Router
const claimrouter = express.Router();

//post route to submit a claim for a found item
claimrouter.post('/',upload.single('image'),async(req,res)=>{

    console.log(req.body);
    console.log('Request Type:',req.method);
    console.log(req.file.filename);

        // Check if file was uploaded
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

    try {
        const {itemId}=req.body;
        const {details}=req.body;
        const filePath=req.file.path; // Handle the uploaded file

        if(itemId){
            const item=await Item.findById(itemId);
            if(!item){
                return res.status(404).json({message:"Item not found"});
            }
        }

        //create a new claim object
        const newClaim = new Claim({
            itemId:itemId ? itemId:null,
            details:req.body.details,
            claimDateTime:req.body.claimDateTime,
            location:req.body.location,
            postType:req.body.postType,
            image:{
                data:fs.readFileSync(path.join(__dirname,"../uploads/"+req.file.filename)),
                contentType:req.file.mimetype, //Ensure mimetype is correct
            }
        });

        //save the claim
        await newClaim.save();

        res.status(200).send({message:"claim submitted successfully",filePath});
    } catch (error) {
        console.error("Failed to submit claim",error);
        res.status(500).json({message:"Failed to submit claim",error:error.message});
    }
});

//GET Route to retrive all claims for a specific item
claimrouter.get('/',async(req,res)=>{
    try {
        const claimItems=await Claim.find({postType:'claim'});
        res.status(200).json(claimItems);
    } catch (error) {
        console.error("Error fetching Claims", error);
        res.status(500).json({message:"Failed to fetch claims",error:error.message});
    }
});

//Export the claim router
module.exports=claimrouter;