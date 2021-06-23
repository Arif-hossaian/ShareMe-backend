import express from "express";
import multer from "multer";
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import SchemaFile from "../models/SchemaFile";

const storage = multer.diskStorage({});
let upload = multer({
  storage,
});

const router = express.Router();
router.post("/upload", upload.single("myFile"), async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ msg: "Hello, we need the file" });
    let uploadedFile: UploadApiResponse;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "ShareMeFile",
        resource_type: "auto",
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: "Cloudinary error", error });
    }
    const { originalname } = req.file;
    const { secure_url, bytes, format } = uploadedFile;
    const file = await SchemaFile.create({
      fileName: originalname,
      sizeInBytes: bytes,
      secureUrl: secure_url,
      formate: format,
    });
    res.status(200).json({
      id: file._id,
      downloadPageLink: `${process.env.API_BASE_ENDPOINT_CLIENT}download/${file._id}`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error" });
  }
});

export default router;
