// Externel imports
const express=require('express');
const mongoose=require('mongoose');

//internal imports
const Claim=require('../models/claim');

//Initialize Router
const claimRouter = express.Router();

//post route to submit a claim for a found item
claimRouter.post(':/itemId',async(req,res)=>{
    try {
        const {itemId}=req.params;
        const { claimantName,claimantContact,claimantDescription}=req.body;

        //Find the item by ID
        const item=await Item.findById(itemId);

        if(!item){
            return res.status(404).json({message:"Item not found"});
        }

        //create a new claim object
        const newClaim = new Claim({
            itemId:itemId,
            claimantName:claimantName,
            claimantContact:claimantContact,
            claimantDescription:claimantDescription,
            claimDate: new Date(),
        });

        //save the claim
        await newClaim.save();

        res.status(200).json({message:"claim submitted successfully"});
    } catch (error) {
        console.error("Failed to submit claim",error);
        res.status(500).json({message:"Failed to submit claim",error:error.message});
    }
});

//GET Route to retrive all claims for a specific item
claimRouter.get('/:itemId',async(req,res)=>{
    try {
        const {itemId} =req.params;
        
        //Find all claims related to the item
        const claims= await Claim.find({itemId:itemId});

        res.status(200).json(claims);
    } catch (error) {
        console.error("Error fetching Claims", error);
        res.status(500).json({message:"Failed to fetch claims",error:error.message});
    }
});

//Export the claim router
module.exports=claimRouter;