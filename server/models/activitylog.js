const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActivitySchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    activity_type: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        
    }

},{timestamps:true});

const Activity = mongoose.model('Activity', ActivitySchema);

module.exports = Activity;
