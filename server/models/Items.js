const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    itemName: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ["Accessories", "Electronics", "Clothings", "Documents", "Vehicle", "Pets", "Office Supplies", "Medicine", "Personal Care","Personal Items", "Money", "Others"]
    },
    division: {
        type: String,
        required: true,
        
    },
    district: {
        type: String,
        required: true,
        
    },
    location: {
        type: String,
        required: true
    },
    image: {
       data:Buffer,
       contentType: {
        type: String,
        enum:['image/jpeg','image/png','image/jpg','image/gif'], //add more types if needed
        required:true
       }
    },
    foundDateTime:
    {
        type: Date,
        required: true, 
    },
    rewardAmount: {
        type: Number,
        required: true,
        min: 0,
        max: 500
    },
    postType: {
        type: String,
        required: true,
        enum: ["post","found","announcement"]
    },
},{timestamps:true});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
