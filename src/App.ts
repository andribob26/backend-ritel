import express, { Application, Router } from "express";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import cors from "cors";
import Config from "./config/Config";
import Route from "./routes/Route";
import UserRoute from "./routes/UserRoute";
import BarangRoute from "./routes/BarangRoute";
import KategoriRoute from "./routes/KategoriRoute";
import AuthRoute from "./routes/AuthRoute";

const app: Application = express();
const router: Router = express.Router();
const route = new Route();

class App {
  constructor() {
    app.use(
      cors({
        origin: "http://localhost:3000",
        credentials: true,
      })
    );
    app.use(morgan("dev"));

    app.use(bodyParser.json());

    app.use(
      bodyParser.urlencoded({
        extended: true,
      })
    );
    app.use(cookieParser());

    app.use(
      session({
        store: new MongoStore({
          mongoUrl: Config.database.uri,
        }),
        secret: String(Config.secret),
        saveUninitialized: false,
        resave: false,
        cookie: {
          secure: false,
          httpOnly: false,
          sameSite: false,
          maxAge: 1000 * 60 * 60 * 24,
        },
      })
    );
  }

  async useRoute(): Promise<void> {
    route.useRoute(new AuthRoute(app, router));
    route.useRoute(new UserRoute(app, router));
    route.useRoute(new BarangRoute(app, router));
    route.useRoute(new KategoriRoute(app, router));
  }

  async runServer(port: number): Promise<void> {
    let conn = await mongoose
      .connect(String(Config.database.uri))
      .catch((error) => {
        console.log("====================================");
        console.log(error);
        console.log("Koneksi database gagal");
        console.log("====================================");
      });

    if (conn) {
      app
        .listen(port, () => {
          console.log("====================================");
          console.log(`server berjalan di port: http://localhost:${port}`);
          console.log("====================================");
        })
        .on("error", (error) => {
          console.log("====================================");
          console.log(error);
          console.log("====================================");
        });
    }
  }
}

export default App;
