"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_ts_1 = require("mongoose-paginate-ts");
const barangSchema = new mongoose_1.default.Schema({
    kodeBarang: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String,
        required: false,
    },
    idCloudinary: {
        type: String,
        required: false,
    },
    name: {
        type: String,
        required: true,
    },
    kategori: {
        _id: {
            type: mongoose_1.default.Schema.Types.ObjectId,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
    },
    hpp: {
        type: Number,
        required: true,
    },
    hargaJual: {
        type: Number,
        required: true,
    },
    stok: {
        type: Number,
        required: false,
    },
    deskripsi: {
        type: String,
        required: false,
    },
}, { timestamps: true });
barangSchema.plugin(mongoose_paginate_ts_1.mongoosePagination);
const Barang = mongoose_1.default.model("Barang", barangSchema);
exports.default = Barang;
