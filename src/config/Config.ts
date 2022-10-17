import * as dotenv from "dotenv";
dotenv.config();

class Config {
  static database = {
    uri: process.env.DB_URL,
  };
  static cloudinary = {
    cloudName: process.env.CLOUDINARY_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  };
  static secret = process.env.SECRET;
}

export default Config;
