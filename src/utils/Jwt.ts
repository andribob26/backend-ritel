import Config from "../config/Config";
import jwt from "jsonwebtoken";
import { Pagination } from "mongoose-paginate-ts";
import { InUser } from "../models/interface_models/IUser";
import User from "../models/User";

class Jwt {
  private static _model: Pagination<InUser> = User;

  static createToken(username: any, callback: Function) {
    const token = jwt.sign({ data: username }, String(Config.secret), {
      expiresIn: "1m",
    });
    if (!token) {
      const error = new Error("Gagal membuat token");
      callback(error, null);
    } else {
      callback(null, token);
    }
  }

  static verifyToken(token: any, callback: Function) {
    jwt.verify(
      token,
      String(Config.secret),
      async (error: any, decode: any) => {
        if (!decode) {
          return callback(error);
        } else {
          const user = await this._model.findOne({
            username: decode.data,
          });

          if (user) {
            callback(null, user);
          }
        }
      }
    );
  }
}

export default Jwt;
