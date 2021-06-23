import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/dbConfig";
import router from "./routes/FileRoute";
import { v2 as cloudinary } from "cloudinary";
const app = express();

dotenv.config();
connectDB();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_API_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use("/api/files", router);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is runnning on port number:- ${PORT}`);
});
