const multer = require('multer');
const express =require('express');
const path =require('path');

const filelocation = './uploads'
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, filelocation)
    },
    filename: function (req, file, cb) {
      const fileext = path.extname(file.originalname);
      const filename =file.originalname
                        .replace(fileext,"")
                        .toLowerCase()
                        .split(' ')
                        .join('-')
                        +"-"+Date.now();
      cb(null, filename+fileext)
    }
  })
  
  const upload = multer({
     storage: storage ,
     limits: {
        fileSize:5000000  //5MB

     }
    
    
    
    
    });


    module.exports = upload;