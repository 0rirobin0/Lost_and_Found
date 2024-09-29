const mongoose=require('mongoose');
const Schema=mongoose.Schema;

//Create a claim Schema
const claimSchema = new Schema({
    itemId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item', //Reference to the item model
        required: true
    },
    details:{
        type:String,
        required:true
    },
    lostDateTime:{
        type:Date,
        default:Date.now //Automically set to current date
    },
    location: {
        type: String, // Ensure this field is in the schema
        required: true,
    },
    image:{
        data:Buffer,//this store image data
        contentType:{
            type:String,
            enum:['image/jpeg','image/jpg','image/png','image/gif'],
            required:true,
        }
    },
    claimStatus:{
        type:String,
        enum:["pending","Approved","Rejected"],
        default:"pending"
    }
},{timestams:true});

// Create a model for claim
const Claim = mongoose.model('claim',claimSchema);

module.exports=Claim;