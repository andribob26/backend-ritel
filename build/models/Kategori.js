"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_ts_1 = require("mongoose-paginate-ts");
const kategoriSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
}, { timestamps: true });
kategoriSchema.plugin(mongoose_paginate_ts_1.mongoosePagination);
const Kategori = mongoose_1.default.model("Kategori", kategoriSchema);
exports.default = Kategori;
