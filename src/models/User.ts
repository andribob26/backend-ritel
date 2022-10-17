import mongoose, { Model } from "mongoose";
import { mongoosePagination, Pagination } from "mongoose-paginate-ts";
import bcrypt from "bcrypt";
import { InstanceMethods, IUser, InUser } from "./interface_models/IUser";

const salt: number = 10;

const userSchema = new mongoose.Schema<IUser, InUser, {}, InstanceMethods>(
  {
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
  },
  { timestamps: true }
);

userSchema.plugin(mongoosePagination);

userSchema.pre("save", function (next) {
  let user = this;

  if (user.isModified("password")) {
    bcrypt.genSalt(salt, function (error, salt): any {
      if (error) {
        return next(error);
      }
      bcrypt.hash(user.password, salt, function (error, hast): any {
        if (error) {
          return next(error);
        }
        user.password = hast;
        return next();
      });
    });
  } else {
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

userSchema.methods.comparePassword = function (
  candidatePass: any,
  callBack: Function
) {
  bcrypt.compare(candidatePass, this.password, function (error, isMatch) {
    if (error) {
      return callBack(error);
    }
    callBack(null, isMatch);
  });
};

const User: Pagination<InUser> = mongoose.model<IUser, Pagination<InUser>>(
  "User",
  userSchema
);

export default User;
