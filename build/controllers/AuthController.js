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
const User_1 = __importDefault(require("../models/User"));
const Jwt_1 = __importDefault(require("../utils/Jwt"));
class AuthController {
    constructor() {
        this._model = User_1.default;
    }
    login(req, res, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this._model.findOne({
                    username: req.body.username,
                });
                if (!user) {
                    return res.status(404).json({
                        success: false,
                        message: "Username salah!",
                        data: null,
                    });
                }
                else {
                    user.comparePassword(req.body.password, (error, isMatch) => __awaiter(this, void 0, void 0, function* () {
                        if (error) {
                            return res.status(404).json({
                                success: false,
                                message: error,
                                data: null,
                            });
                        }
                        if (!isMatch) {
                            return res.status(404).json({
                                success: false,
                                message: "User password salah!",
                                data: null,
                            });
                        }
                        else {
                            const result = yield User_1.default.findByIdAndUpdate(user.id, {
                                lastLogin: new Date(),
                            });
                            if (result) {
                                Jwt_1.default.createToken(result.username, (error, token) => {
                                    if (error) {
                                        return res.status(404).json({
                                            success: false,
                                            message: error,
                                            data: null,
                                        });
                                    }
                                    else {
                                        req.session.user = {
                                            id: result.id,
                                            auth: true,
                                            username: result.username,
                                            name: result.name,
                                            telephone: result.telephone,
                                            email: result.email,
                                            role: result.role,
                                            token: token,
                                        };
                                        return res.status(200).json({
                                            success: true,
                                            message: "Berhasil login",
                                            data: result,
                                        });
                                    }
                                });
                            }
                        }
                    }));
                }
            }
            catch (error) {
                return res.status(404).json({
                    success: false,
                    message: error,
                    data: null,
                });
            }
        });
    }
}
exports.default = AuthController;
