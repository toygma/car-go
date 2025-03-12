import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv"


dotenv.config()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImagesToCloudinary = async (
  image: string,
  folder: string
) => {
  const result = await cloudinary.uploader.upload(image, { folder });
  return {
    url: result.url,
    public_id: result.public_id,
  };
};

export const uploadMultipleCloudinary = async (
  image: string[],
  folder: string
) => {
  const result = image.map((image) => uploadImagesToCloudinary(image, folder));
  return Promise.all(result);
};

export const deleteCloudinary = async (publicId: string) => {
  const res = await cloudinary.uploader.destroy(publicId);
  return res?.result === "ok";
};
