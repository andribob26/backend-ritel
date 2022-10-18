import { Application, Router } from "express";
import IRoute from "./interface_route/IRoute";
import UserController from "../controllers/UserController";
interface IData {
  name: string;
  username: string;
  password: string;
  telephone: string;
  email: string;
  role: string;
  lastLogin: any;
}

const controller = new UserController();

class UserRoute implements IRoute {
  private _app: Application;
  private _router: Router;
  constructor(app: Application, router: Router) {
    this._app = app;
    this._router = router;
  }

  async routes(): Promise<void> {
    this._router.get("/get-all-user", (req, res): void => {
      controller.setCondition(String(req.query.search));
      controller.getAllData(req, res);
    });

    this._router.post("/add-user", (req, res): void => {
      const data = <IData>{
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        telephone: req.body.telephone,
        email: req.body.email,
        role: req.body.role,
        lastLogin: null,
      };
      controller.addData(req, res, data);
    });

    this._router.get("/get-user-by-id/:id", (req, res): void => {
      controller.getDataById(req, res, req.params.id);
    });

    this._router.delete("/delete-user/:id", (req, res): void => {
      controller.deleteDataById(req, res, req.params.id);
    });

    this._app.use(this._router);
  }
}

export default UserRoute;
