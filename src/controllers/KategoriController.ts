import { Request, Response } from "express";
import Controller from "./Controller";
import IKategori from "../models/interface_models/IKategori";
import Kategori from "../models/Kategori";


class KategoriController extends Controller<IKategori> {
  constructor() {
    super(Kategori);
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
}

export default KategoriController;
