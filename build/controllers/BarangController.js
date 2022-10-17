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
const Controller_1 = __importDefault(require("./Controller"));
const Barang_1 = __importDefault(require("../models/Barang"));
const ResponseData_1 = __importDefault(require("../utils/ResponseData"));
class BarangController extends Controller_1.default {
    constructor() {
        super(Barang_1.default);
    }
    setCondition(value) {
        this._condition = {
            $or: [
                {
                    name: {
                        $regex: new RegExp(value),
                        $options: "i",
                    },
                },
            ],
        };
    }
    getDataByKode(req, res, kode) {
        return __awaiter(this, void 0, void 0, function* () {
            const responseData = new ResponseData_1.default(res);
            try {
                const data = yield this._model.findOne({
                    kodeBarang: kode,
                });
                if (!data) {
                    return responseData.resError(false, "Operasi ini tidak dapat dilakukan, data tidak ditemukan", null);
                }
                else {
                    return responseData.resSuccess(true, "Berhasil menambahkan data", data);
                }
            }
            catch (error) {
                return responseData.resError(false, error.message, null);
            }
        });
    }
}
exports.default = BarangController;
