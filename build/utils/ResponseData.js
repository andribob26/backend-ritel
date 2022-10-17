"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseData {
    constructor(res) {
        this._res = res;
    }
    resSuccess(status, message, data) {
        return this._res.status(200).json({
            status: status,
            message: message,
            data: data,
        });
    }
    resError(status, message, data) {
        return this._res.status(500).json({
            status: status,
            message: message,
            data: data,
        });
    }
}
exports.default = ResponseData;
