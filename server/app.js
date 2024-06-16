// External Imports

const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
var cors = require('cors');



// Internal Imports
const postrouter = require('./routers/postrouter');
const userrouter = require('./routers/userrouter');



// setup
const app = express();
dotenv.config();
app.use(cors({
  // origin: 'http://localhost:5173' // Your frontend URL
}));


  
// request parser
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// database connection
mongoose.connect(process.env.MONGO_CONNECTION_STRING)
.then(()=> console.log("Connected to Database Successfully"))
.catch(err=> console.log("Database Connection Failed ERROR: "+err));



// ROUTE HANDLER

// app.use('/login',loginrouter);
app.use('/api/post',postrouter);
app.use('/api/user',userrouter);



const port=3000;
// server running
app.listen(port,()=>
{
    console.log("Server is running on port:"+port);
})