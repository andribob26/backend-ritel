import { Request, Response } from "express";
import { Pagination } from "mongoose-paginate-ts";
import { InUser, IUser } from "../models/interface_models/IUser";
import User from "../models/User";
import ISession from "../utils/ISession";
import Jwt from "../utils/Jwt";

class AuthController<T> {
  private _model: Pagination<InUser> = User;

  async login(req: Request, res: Response, data: T): Promise<any> {
    try {
      const user = await this._model.findOne({
        username: req.body.username,
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Username salah!",
          data: null,
        });
      } else {
        user.comparePassword(
          req.body.password,
          async (error: any, isMatch: any) => {
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
            } else {
              const result: IUser | null = await User.findByIdAndUpdate(
                user.id,
                {
                  lastLogin: new Date(),
                }
              );

              if (result) {
                Jwt.createToken(result.username, (error: any, token: any) => {
                  if (error) {
                    return res.status(404).json({
                      success: false,
                      message: error,
                      data: null,
                    });
                  } else {
                    (req.session as ISession).user = {
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
          }
        );
      }
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error,
        data: null,
      });
    }
  }
}

export default AuthController;
