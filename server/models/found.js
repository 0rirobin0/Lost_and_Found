const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const foundSchema= new Schema({
    itemName:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
        enum: ["Accessories", "Electronics", "Clothings", "Documents", "Vehicle", "Pets", "Office Supplies", "Medicine", "Personal Care", "Personal Items", "Money", "Others"]
    },
    division:{
        type:String,
        required:true,
    },
    district:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    details:{
        type:String,
        required:true,
    },
    foundDateTime:{
        type:Date,
        required:true,
    },
    rewardAmount:{
        type:Number,
        required:true,
        min:0,
        max:500
    },
    image:{
        data:Buffer,//this store image data
        contentType:{
            type:String,
            enum:['image/jpeg', 'image/png', 'image/jpg', 'image/gif'],//allowed file types
            required:true
        }
    }
},{timestamps:true});

//create and exported the model
const Found=mongoose.model('Found',foundSchema);
module.exports=Found;