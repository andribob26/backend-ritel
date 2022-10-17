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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
class Jwt {
    static createToken(username, callback) {
        const token = jsonwebtoken_1.default.sign({ data: username }, String(Config_1.default.secret), {
            expiresIn: "1m",
        });
        if (!token) {
            const error = new Error("Gagal membuat token");
            callback(error, null);
        }
        else {
            callback(null, token);
        }
    }
    static verifyToken(token, callback) {
        jsonwebtoken_1.default.verify(token, String(Config_1.default.secret), (error, decode) => __awaiter(this, void 0, void 0, function* () {
            if (!decode) {
                return callback(error);
            }
            else {
                const user = yield this._model.findOne({
                    username: decode.data,
                });
                if (user) {
                    callback(null, user);
                }
            }
        }));
    }
}
Jwt._model = User_1.default;
exports.default = Jwt;
