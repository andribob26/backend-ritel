import { Application, Router } from "express";
import IRoute from "./interface_route/IRoute";
import KategoriController from "../controllers/KategoriController";
interface IData {
  name: string;
}

const controller = new KategoriController();

class KategoriRoute implements IRoute {
  private _app: Application;
  private _router: Router;
  constructor(app: Application, router: Router) {
    this._app = app;
    this._router = router;
  }

  async routes(): Promise<void> {
    this._router.get("/get-all-kategori", (req, res): void => {
      controller.setCondition(String(req.query.search));
      controller.getAllData(req, res);
    });

    this._router.post("/add-kategori", (req, res): void => {
      const data = <IData>{
        name: req.body.name,
      };
      controller.addData(req, res, data);
    });

    this._router.get("/get-kategori-by-id/:id", (req, res): void => {
      controller.getDataById(req, res, req.params.id);
    });

    this._router.delete("/delete-kategori/:id", (req, res): void => {
      controller.deleteDataById(req, res, req.params.id);
    });

    this._app.use(this._router);
  }
}

export default KategoriRoute;
