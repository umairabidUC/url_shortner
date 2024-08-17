import { v2 as cloudinary } from "cloudinary"


cloudinary.config({
    cloud_name: 'djxcdwkm7',
    api_key: "619257468491565",
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});