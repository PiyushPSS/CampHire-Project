import {v2 as cloudinary} from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

const check = cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
});

if (check) {
    console.log("Cloudinary connected");
} else {
    console.log("Cloudinary not connected");
}
export default cloudinary;