"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_ts_1 = require("mongoose-paginate-ts");
const bcrypt_1 = __importDefault(require("bcrypt"));
const salt = 10;
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    telephone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
    },
    lastLogin: {
        type: Date,
    },
}, { timestamps: true });
userSchema.plugin(mongoose_paginate_ts_1.mongoosePagination);
userSchema.pre("save", function (next) {
    let user = this;
    if (user.isModified("password")) {
        bcrypt_1.default.genSalt(salt, function (error, salt) {
            if (error) {
                return next(error);
            }
            bcrypt_1.default.hash(user.password, salt, function (error, hast) {
                if (error) {
                    return next(error);
                }
                user.password = hast;
                return next();
            });
        });
    }
    else {
        return next();
    }
});
// UserSchema.pre('findOneAndUpdate', function (next) {
//   let user = this
//   if (user._update.password) {
//     bcrypt.genSalt(salt, function (err, salt) {
//       if (err) {
//         return next(err)
//       }
//       bcrypt.hash(user._update.password, salt, function (err, hast) {
//         if (err) {
//           return next(err)
//         }
//         user._update.password = hast
//         return next()
//       })
//     })
//   } else {
//     return next()
//   }
// })
userSchema.methods.comparePassword = function (candidatePass, callBack) {
    bcrypt_1.default.compare(candidatePass, this.password, function (error, isMatch) {
        if (error) {
            return callBack(error);
        }
        callBack(null, isMatch);
    });
};
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
