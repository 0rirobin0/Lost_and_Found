// External Imports

const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
var cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");



// Internal Imports
const postrouter = require('./routers/postrouter');
const userrouter = require('./routers/userrouter');
const foundrouter =require('./routers/foundrouter');
const claimrouter = require('./routers/claimrouter');
const messagerouter = require('./routers/messagerouter');
const activityrouter = require('./routers/activityrouter');



// setup
const app = express();
dotenv.config();
app.use(cors({
  origin: [process.env.REACT_APP_FRONTEND_URL],
  methods:["POST","GET","PATCH","PUT"],
  credentials:true
}));



  
// request parser
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

// database connection
mongoose.connect(process.env.MONGO_CONNECTION_STRING)
.then(()=> console.log("Connected to Database Successfully"))
.catch(err=> console.log("Database Connection Failed ERROR: "+err));

// Route Handler
app.get('/', (req, res) => {
  res.status(200).send('Welcome to the Lost and Found API');
});


// app.use('/login',loginrouter);
app.use('/api/post',postrouter);
app.use('/api/user',userrouter);
app.use('/api/found',foundrouter);
app.use('/api/claim',claimrouter);
app.use('/api/message',messagerouter);
app.use('/api/activity',activityrouter);










const port=3000;
// server running
app.listen(port,()=>
{
    console.log("Server is running on port:"+port);
})