"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = __importDefault(require("../config/Config"));
const cloudinary_1 = __importDefault(require("cloudinary"));
cloudinary_1.default.v2.config({
    cloud_name: Config_1.default.cloudinary.cloudName,
    api_key: Config_1.default.cloudinary.apiKey,
    api_secret: Config_1.default.cloudinary.apiSecret,
});
class Cloudinary {
    static upload(model, data, file, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield cloudinary_1.default.v2.uploader.upload(file, {
                    folder: "ritel",
                }, (error, resultCloud) => __awaiter(this, void 0, void 0, function* () {
                    if (!error) {
                        data.image = resultCloud.secure_url;
                        data.idCloudinary = resultCloud.public_id;
                        const resultData = yield new model(data).save();
                        if (resultData) {
                            return callback(null, resultData);
                        }
                    }
                }));
            }
            catch (error) {
                return callback(error, null);
            }
        });
    }
    static update(model, id, data, file, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield cloudinary_1.default.v2.uploader.upload(file, {
                    folder: "ritel",
                }, (error, resultCloud) => __awaiter(this, void 0, void 0, function* () {
                    if (!error) {
                        data.image = resultCloud.secure_url;
                        data.idCloudinary = resultCloud.public_id;
                        const beforeData = yield model.findById(id);
                        const resultData = yield model.findByIdAndUpdate(id, data);
                        if (resultData) {
                            yield cloudinary_1.default.v2.uploader.destroy(beforeData.idCloudinary);
                            callback(null, resultData);
                        }
                    }
                }));
            }
            catch (error) {
                return callback(error, null);
            }
        });
    }
    static delete(model, id, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resultData = yield model.findByIdAndDelete(id);
                if (resultData) {
                    yield cloudinary_1.default.v2.uploader.destroy(resultData.idCloudinary);
                    callback(null, resultData);
                }
            }
            catch (error) {
                return callback(error, null);
            }
        });
    }
}
exports.default = Cloudinary;
