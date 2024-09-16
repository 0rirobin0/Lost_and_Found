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

     },
    //File filter to ensure only images are upload
     fileFilter: function (req, file, cb) {
      const filetypes = /jpeg|jpg|png|gif/;
      const mimetype = filetypes.test(file.mimetype);
      const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

      if (mimetype && extname) {
          return cb(null, true);
      } else {
          cb(new Error('Only images are allowed'));
      }
  }
    
    
    });


    module.exports = upload;