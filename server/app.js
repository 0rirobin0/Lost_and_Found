// External Imports

const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
var cors = require('cors');



// Internal Imports
const postrouter = require('./routers/postrouter');
const userrouter = require('./routers/userrouter');
const foundrouter =require('./routers/foundrouter');
const claimrouter = require('./routers/claimrouter');



// setup
const app = express();
dotenv.config();
app.use(cors({
  origin: [process.env.REACT_APP_FRONTEND_URL],
  methods:["POST","GET"],
  credentials:true
}));


  
// request parser
app.use(express.json());
app.use(express.urlencoded({extended:true}));

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








const port=3000;
// server running
app.listen(port,()=>
{
    console.log("Server is running on port:"+port);
})