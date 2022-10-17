import { Request, Response, NextFunction } from "express";
import multer, { FileFilterCallback } from "multer";
import path from "path";
import ResponseData from "./utils/ResponseData";

class Middlewares {
  private _maxSize: number = 1 * 1024 * 1024;

  constructor() {}

  image(req: Request, res: Response, next: NextFunction) {
    const responseData = new ResponseData(res);
    const upload = multer({
      storage: multer.diskStorage({}),
      fileFilter: (req, file, cb: FileFilterCallback) => {
        let ext = path.extname(file.originalname);
        if (
          ext !== ".jpg" &&
          ext !== ".jpeg" &&
          ext !== ".png" &&
          ext !== ".JPG" &&
          ext !== ".JPEG" &&
          ext !== ".PNG"
        ) {
          return cb(new Error("File type tidak suport"));
        }
        return cb(null, true);
      },
      limits: { fileSize: this._maxSize },
    }).single("image");

    upload(req, res, (error) => {
      if (error) {
        if (error.code === "LIMIT_FILE_SIZE") {
          return responseData.resError(false, "File terlalu besar", null);
        }
        return responseData.resError(false, error.message, null);
      } else {
        return next();
      }
    });
  }
}

export default Middlewares;
