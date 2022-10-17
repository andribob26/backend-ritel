import { Request, Response } from "express";
import Controller from "./Controller";
import IBarang from "../models/interface_models/IBarang";
import Barang from "../models/Barang";
import ResponseData from "../utils/ResponseData";

class BarangController<T> extends Controller<IBarang, T> {
  constructor() {
    super(Barang);
  }

  setCondition(value: string) {
    this._condition = {
      $or: [
        {
          name: {
            $regex: new RegExp(value),
            $options: "i",
          },
        },
      ],
    };
  }

  async getDataByKode(req: Request, res: Response, kode: any): Promise<any> {
    const responseData = new ResponseData(res);
    try {
      const data = await this._model.findOne({
        kodeBarang: kode,
      });
      if (!data) {
        return responseData.resError(
          false,
          "Operasi ini tidak dapat dilakukan, data tidak ditemukan",
          null
        );
      } else {
        return responseData.resSuccess(true, "Berhasil menambahkan data", data);
      }
    } catch (error) {
      return responseData.resError(false, error.message, null);
    }
  }
}

export default BarangController;
