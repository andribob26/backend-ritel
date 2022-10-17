import { Request, Response } from "express";
import { Pagination } from "mongoose-paginate-ts";
import IController from "./interface_controller/IController";
import ResponseData from "../utils/ResponseData";
import Cloudinary from "../utils/Cloudinary";

interface IReqData {
  search: string;
  page: number;
  size: number;
}

class Controller<T, T2> implements IController {
  protected _model: Pagination<T>;
  protected _condition: any = {};

  constructor(model: Pagination<T>) {
    this._model = model;
  }

  async getAllData(req: Request, res: Response): Promise<any> {
    const responseData = new ResponseData(res);

    const reqData: IReqData = {
      search: String(req.query.search),
      page: Number(req.query.page),
      size: Number(req.query.size),
    };

    const condition = req.query.search ? this._condition : {};

    try {
      const result = await this._model.paginate({
        query: condition,
        sort: { createdAt: -1 },
        page: !isNaN(reqData.page) ? reqData.page : 1,
        limit: !isNaN(reqData.size) ? reqData.size : 10,
      });

      if (!result) {
        return responseData.resSuccess(true, "Tidak ada data", null);
      } else {
        if (result.docs.length < 1) {
          if (reqData.search === "" || reqData.search === undefined) {
            return responseData.resSuccess(true, "Tidak ada data", null);
          } else {
            responseData.resSuccess(
              true,
              "Tidak ada data yang cocok di temukan",
              null
            );
          }
        } else {
          return responseData.resSuccess(
            true,
            "Berhasil mengambil data",
            result
          );
        }
      }
    } catch (error) {
      return responseData.resError(false, error.message, null);
    }
  }

  async addData(req: Request, res: Response, data: T2): Promise<any> {
    const responseData = new ResponseData(res);
    try {
      const result = await new this._model(data).save();
      if (result) {
        return responseData.resSuccess(
          true,
          "Berhasil menambahkan data",
          result
        );
      }
    } catch (error) {
      if (error.code === 11000) {
        const nameKey = Object.keys(error.keyValue);
        if (error.keyValue[String(nameKey)]) {
          return responseData.resError(
            false,
            `${error.keyValue[String(nameKey)]} sudah ada`,
            null
          );
        }
      }

      return responseData.resError(false, error.message, null);
    }
  }

  async addDataWithImage(req: Request, res: Response, data: T2): Promise<any> {
    const responseData = new ResponseData(res);
    await Cloudinary.upload<T>(
      this._model,
      data,
      req.file!.path,
      async (error: any, result: any) => {
        if (!error) {
          return responseData.resSuccess(
            true,
            "Berhasil menambahkan data",
            result
          );
        } else {
          if (error.code === 11000) {
            const nameKey = Object.keys(error.keyValue);
            if (error.keyValue[String(nameKey)]) {
              return responseData.resError(
                false,
                `${error.keyValue[String(nameKey)]} sudah ada`,
                null
              );
            }
          }

          return responseData.resError(false, error.message, null);
        }
      }
    );
  }

  async getDataById(req: Request, res: Response, id: any): Promise<any> {
    const responseData = new ResponseData(res);
    try {
      const data = await this._model.findById(id);
      if (!data) {
        return responseData.resError(
          false,
          "Operasi ini tidak dapat dilakukan, data tidak ditemukan",
          null
        );
      } else {
        return responseData.resSuccess(true, "Berhasil mengambil data", data);
      }
    } catch (error) {
      return responseData.resError(false, error.message, null);
    }
  }

  async deleteDataById(req: Request, res: Response, id: any): Promise<any> {
    const responseData = new ResponseData(res);
    try {
      const data = await this._model.findByIdAndDelete(id);
      if (!data) {
        return responseData.resError(
          false,
          "Operasi ini tidak dapat dilakukan, data tidak ditemukan",
          null
        );
      } else {
        return responseData.resSuccess(true, "Berhasil menghapus data", data);
      }
    } catch (error) {
      return responseData.resError(false, error.message, null);
    }
  }

  async deleteDataByIdWithImage(
    req: Request,
    res: Response,
    id: any
  ): Promise<any> {
    const responseData = new ResponseData(res);
    await Cloudinary.delete(this._model, id, (error: any, result: any) => {
      if (!error) {
        return responseData.resSuccess(true, "Berhasil menghapus data", result);
      } else {
        return responseData.resError(false, error.message, null);
      }
    });
  }

  async editByIdWithImage(
    req: Request,
    res: Response,
    id: any,
    data: T2
  ): Promise<any> {
    const responseData = new ResponseData(res);
    await Cloudinary.update<T>(
      this._model,
      id,
      data,
      req.file?.path,
      (error: any, result: any) => {
        if (!error) {
          return responseData.resSuccess(
            true,
            "Berhasil menghapus data",
            result
          );
        } else {
          return responseData.resError(false, error.message, null);
        }
      }
    );
  }
}

export default Controller;
