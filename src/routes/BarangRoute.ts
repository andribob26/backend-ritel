import { Application, Router, Request, Response, NextFunction } from "express";
import IRoute from "./interface_route/IRoute";
import BarangController from "../controllers/BarangController";
import Middlewares from "../Middlewares";
import Kategori from "../models/Kategori";

interface IData {
  kodeBarang: string;
  image: string;
  idCloudinary: string;
  name: string;
  kategori: {
    _id: any;
    name: string;
  };
  hpp: number;
  hargaJual: number;
  stok: number;
  deskripsi: string;
}

const controller = new BarangController<IData>();
const middlewares = new Middlewares();

class BarangRoute implements IRoute {
  private _app: Application;
  private _router: Router;
  constructor(app: Application, router: Router) {
    this._app = app;
    this._router = router;
  }

  routes(): void {
    this._router.get("/get-all-barang", (req: Request, res: Response) => {
      controller.setCondition(String(req.query.search));
      controller.getAllData(req, res);
    });

    this._router.post(
      "/add-barang",
      (req: Request, res: Response, next: NextFunction) => {
        middlewares.image(req, res, next);
      },
      async (req: Request, res: Response) => {
        const kategori = await Kategori.findById(req.body.idKategori);
        const data = <IData>{
          kodeBarang: req.body.kodeBarang,
          name: req.body.name,
          kategori: {
            _id: kategori!._id,
            name: kategori!.name,
          },
          hpp: req.body.hpp,
          hargaJual: req.body.hargaJual,
          deskripsi: req.body.deskripsi,
          stok: 0,
        };
        controller.addDataWithImage(req, res, data);
      }
    );

    this._router.get("/get-barang-by-kode/:kode", (req, res): void => {
      controller.getDataByKode(req, res, req.params.kode);
    });

    this._router.delete(
      "/delete-barang/:id",
      async (req, res): Promise<void> => {
        controller.deleteDataByIdWithImage(req, res, req.params.id);
      }
    );

    this._router.put(
      "/edit-barang/:id",
      (req: Request, res: Response, next: NextFunction) => {
        middlewares.image(req, res, next);
      },
      async (req, res): Promise<void> => {
        const kategori = await Kategori.findById(req.body.idKategori);
        const data = <IData>{
          name: req.body.name,
          kategori: {
            _id: kategori!._id,
            name: kategori!.name,
          },
          hpp: req.body.hpp,
          hargaJual: req.body.hargaJual,
          deskripsi: req.body.deskripsi,
          stok: 0,
        };
        controller.editByIdWithImage(req, res, req.params.id, data);
      }
    );

    this._app.use(this._router);
  }
}

export default BarangRoute;
