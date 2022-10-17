import { Application, Router } from "express";
import IRoute from "./interface_route/IRoute";
import AuthController from "../controllers/AuthController";
interface IData {
  username: string;
  password: string;
}

const controller = new AuthController<IData>();

class AuthRoute implements IRoute {
  private _app: Application;
  private _router: Router;
  constructor(app: Application, router: Router) {
    this._app = app;
    this._router = router;
  }

  async routes(): Promise<void> {
    this._router.post("/login", (req, res): void => {
      const data = <IData>{
        username: req.body.username,
        password: req.body.password,
      };
      controller.login(req, res, data);
    });

    this._router.get("/logout", (req, res): void => {
      controller.logout(req, res);
    });

    this._router.get("/get-session", (req, res): void => {
      controller.getSession(req, res);
    });

    this._router.get("/refresh-token", (req, res): void => {
      controller.refreshToken(req, res);
    });

    this._app.use(this._router);
  }
}

export default AuthRoute;
