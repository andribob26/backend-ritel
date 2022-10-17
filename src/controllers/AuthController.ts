import { Request, Response } from "express";
import session from "express-session";
import { Pagination } from "mongoose-paginate-ts";
import { InUser, IUser } from "../models/interface_models/IUser";
import User from "../models/User";
import ISession from "../utils/ISession";
import Jwt from "../utils/Jwt";
import ResponseData from "../utils/ResponseData";
import GetBarrierToken from "../utils/GetBarrierToken";

class AuthController<T> {
  private _model: Pagination<InUser> = User;

  async login(req: Request, res: Response, data: T): Promise<any> {
    const responseData = new ResponseData(res);
    try {
      const user = await this._model.findOne({
        username: req.body.username,
      });

      if (!user) {
        return responseData.resError(false, "Username salah", null);
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
              return responseData.resError(false, "Password salah", null);
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
                    return responseData.resError(false, error.message, null);
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
                    return responseData.resSuccess(
                      true,
                      "Berhasil login",
                      result
                    );
                  }
                });
              }
            }
          }
        );
      }
    } catch (error) {
      return responseData.resError(false, error.message, null);
    }
  }

  async logout(req: Request, res: Response): Promise<any> {
    const responseData = new ResponseData(res);
    try {
      const result = req.session.destroy((error: any) => {
        if (error) {
          return responseData.resError(false, error.message, null);
        }
      });
      if (!(result as ISession).user) {
        return responseData.resSuccess(true, "Sudah logout", null);
      } else {
        return responseData.resSuccess(true, "Berhasil logout", null);
      }
    } catch (error) {
      return responseData.resError(false, error.message, null);
    }
  }

  async getSession(req: Request, res: Response): Promise<any> {
    const responseData = new ResponseData(res);
    try {
      if (!(req.session as ISession).user) {
        return responseData.resError(false, "Tidak ada session", null);
      } else {
        return responseData.resSuccess(
          true,
          "Berhasil mengambil session",
          (req.session as ISession).user
        );
      }
    } catch (error) {
      return responseData.resError(false, error.message, null);
    }
  }

  async refreshToken(req: Request, res: Response): Promise<any> {
    const responseData = new ResponseData(res);
    try {
      const refreshToken = GetBarrierToken.set(req);

      if (!refreshToken) {
        return responseData.resError(false, "Token tidak ada", null);
      } else {
        Jwt.verifyToken(refreshToken, async (error: any, user: any) => {
          if (error) {
            if ((req.session as ISession).user !== undefined) {
              const user: IUser | null = await User.findOne({
                username: (req.session as ISession).user.username,
              });

              Jwt.createToken(user!.username, (error: any, token: any) => {
                if (error) {
                  return responseData.resError(false, error.message, null);
                } else {
                  (req.session as ISession).user = {
                    id: user!.id,
                    auth: true,
                    username: user!.username,
                    name: user!.name,
                    telephone: user!.telephone,
                    email: user!.email,
                    role: user!.role,
                    token: token,
                  };

                  return responseData.resSuccess(
                    true,
                    "Berhasil refresh token",
                    (req.session as ISession).user
                  );
                }
              });
            } else {
              return responseData.resError(false, "Belum login", null);
            }
          }

          if (user) {
            return responseData.resSuccess(
              true,
              "Token belum expired",
              (req.session as ISession).user
            );
          }
        });
      }
    } catch (error) {
      return responseData.resError(false, error.message, null);
    }
  }
}

export default AuthController;
