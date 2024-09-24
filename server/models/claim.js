const mongoose=require('mongoose');
const Schema=mongoose.Schema;

//Create a claim Schema
const claimSchema = new Schema({
    itemId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item', //Reference to the item model
        required: true
    },
    claimantName:{
        type:String,
        required:true
    },
    claimantContact:{
        type:String,
        required:true
    },
    claimDescription:{
        type:String,
        required:true
    },
    claimDate:{
        type:Date,
        default:Date.now //Automically set to current date
    },
    claimStatus:{
        type:String,
        enum:["pending","Approved","Rejected"],
        default:"Pending"
    }
},{timeStams:true});

// Create a model for claim
const Claim = mongoose.model('claim',claimSchema);

module.exports=Claim;