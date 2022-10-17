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
const ResponseData_1 = __importDefault(require("../utils/ResponseData"));
const Cloudinary_1 = __importDefault(require("../utils/Cloudinary"));
class Controller {
    constructor(model) {
        this._condition = {};
        this._model = model;
    }
    getAllData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const responseData = new ResponseData_1.default(res);
            const reqData = {
                search: String(req.query.search),
                page: Number(req.query.page),
                size: Number(req.query.size),
            };
            const condition = req.query.search ? this._condition : {};
            try {
                const result = yield this._model.paginate({
                    query: condition,
                    sort: { createdAt: -1 },
                    page: !isNaN(reqData.page) ? reqData.page : 1,
                    limit: !isNaN(reqData.size) ? reqData.size : 10,
                });
                if (!result) {
                    return responseData.resSuccess(true, "Tidak ada data", null);
                }
                else {
                    if (result.docs.length < 1) {
                        if (reqData.search === "" || reqData.search === undefined) {
                            return responseData.resSuccess(true, "Tidak ada data", null);
                        }
                        else {
                            responseData.resSuccess(true, "Tidak ada data yang cocok di temukan", null);
                        }
                    }
                    else {
                        return responseData.resSuccess(true, "Berhasil mengambil data", result);
                    }
                }
            }
            catch (error) {
                return responseData.resError(false, error.message, null);
            }
        });
    }
    addData(req, res, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const responseData = new ResponseData_1.default(res);
            try {
                const result = yield new this._model(data).save();
                if (result) {
                    return responseData.resSuccess(true, "Berhasil menambahkan data", result);
                }
            }
            catch (error) {
                if (error.code === 11000) {
                    const nameKey = Object.keys(error.keyValue);
                    if (error.keyValue[String(nameKey)]) {
                        return responseData.resError(false, `${error.keyValue[String(nameKey)]} sudah ada`, null);
                    }
                }
                return responseData.resError(false, error.message, null);
            }
        });
    }
    addDataWithImage(req, res, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const responseData = new ResponseData_1.default(res);
            yield Cloudinary_1.default.upload(this._model, data, req.file.path, (error, result) => __awaiter(this, void 0, void 0, function* () {
                if (!error) {
                    return responseData.resSuccess(true, "Berhasil menambahkan data", result);
                }
                else {
                    if (error.code === 11000) {
                        const nameKey = Object.keys(error.keyValue);
                        if (error.keyValue[String(nameKey)]) {
                            return responseData.resError(false, `${error.keyValue[String(nameKey)]} sudah ada`, null);
                        }
                    }
                    return responseData.resError(false, error.message, null);
                }
            }));
        });
    }
    getDataById(req, res, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const responseData = new ResponseData_1.default(res);
            try {
                const data = yield this._model.findById(id);
                if (!data) {
                    return responseData.resError(false, "Operasi ini tidak dapat dilakukan, data tidak ditemukan", null);
                }
                else {
                    return responseData.resSuccess(true, "Berhasil mengambil data", data);
                }
            }
            catch (error) {
                return responseData.resError(false, error.message, null);
            }
        });
    }
    deleteDataById(req, res, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const responseData = new ResponseData_1.default(res);
            try {
                const data = yield this._model.findByIdAndDelete(id);
                if (!data) {
                    return responseData.resError(false, "Operasi ini tidak dapat dilakukan, data tidak ditemukan", null);
                }
                else {
                    return responseData.resSuccess(true, "Berhasil menghapus data", data);
                }
            }
            catch (error) {
                return responseData.resError(false, error.message, null);
            }
        });
    }
    deleteDataByIdWithImage(req, res, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const responseData = new ResponseData_1.default(res);
            yield Cloudinary_1.default.delete(this._model, id, (error, result) => {
                if (!error) {
                    return responseData.resSuccess(true, "Berhasil menghapus data", result);
                }
                else {
                    return responseData.resError(false, error.message, null);
                }
            });
        });
    }
    editByIdWithImage(req, res, id, data) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const responseData = new ResponseData_1.default(res);
            yield Cloudinary_1.default.update(this._model, id, data, (_a = req.file) === null || _a === void 0 ? void 0 : _a.path, (error, result) => {
                if (!error) {
                    return responseData.resSuccess(true, "Berhasil menghapus data", result);
                }
                else {
                    return responseData.resError(false, error.message, null);
                }
            });
        });
    }
}
exports.default = Controller;
