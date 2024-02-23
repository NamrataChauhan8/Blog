import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import dotenv from "dotenv";
import { request } from "express";
import mongoose from "mongoose";
dotenv.config();

const storage = new GridFsStorage({
  url: 'mongodb+srv://namratac:Namrata@cluster0.nte2w9a.mongodb.net/Blog',
  file: (req, file) => {
    console.log("fbsj", file);
    return {
      filename: file.originalname,
      bucketName: 'uploads',
      id: new mongoose.Types.ObjectId() // Generate a new ObjectId for the file
    };
  }
});

const upload = multer ({ storage });

export default upload;
