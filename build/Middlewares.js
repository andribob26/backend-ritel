"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const ResponseData_1 = __importDefault(require("./utils/ResponseData"));
class Middlewares {
    constructor() {
        this._maxSize = 1 * 1024 * 1024;
    }
    image(req, res, next) {
        const responseData = new ResponseData_1.default(res);
        const upload = (0, multer_1.default)({
            storage: multer_1.default.diskStorage({}),
            fileFilter: (req, file, cb) => {
                let ext = path_1.default.extname(file.originalname);
                if (ext !== ".jpg" &&
                    ext !== ".jpeg" &&
                    ext !== ".png" &&
                    ext !== ".JPG" &&
                    ext !== ".JPEG" &&
                    ext !== ".PNG") {
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
            }
            else {
                return next();
            }
        });
    }
}
exports.default = Middlewares;
