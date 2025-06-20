// src/lib/cloudinary.js
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary using the CLOUDINARY_URL environment variable
// This is the recommended way and works seamlessly with Vercel
cloudinary.config({
  secure: true, // This is important
});

export default cloudinary;
