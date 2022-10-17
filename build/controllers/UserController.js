"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Controller_1 = __importDefault(require("./Controller"));
const User_1 = __importDefault(require("../models/User"));
class UserController extends Controller_1.default {
    constructor() {
        super(User_1.default);
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
                {
                    role: {
                        $regex: new RegExp(value),
                        $options: "i",
                    },
                },
            ],
        };
    }
}
exports.default = UserController;
