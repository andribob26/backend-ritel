"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const cors_1 = __importDefault(require("cors"));
const Config_1 = __importDefault(require("./config/Config"));
const Route_1 = __importDefault(require("./routes/Route"));
const UserRoute_1 = __importDefault(require("./routes/UserRoute"));
const BarangRoute_1 = __importDefault(require("./routes/BarangRoute"));
const KategoriRoute_1 = __importDefault(require("./routes/KategoriRoute"));
const AuthRoute_1 = __importDefault(require("./routes/AuthRoute"));
const app = (0, express_1.default)();
const router = express_1.default.Router();
const route = new Route_1.default();
class App {
    constructor() {
        app.use((0, cors_1.default)({
            origin: "http://localhost:3000",
            credentials: true,
        }));
        app.use((0, morgan_1.default)("dev"));
        app.use(body_parser_1.default.json());
        app.use(body_parser_1.default.urlencoded({
            extended: true,
        }));
        app.use((0, cookie_parser_1.default)());
        app.use((0, express_session_1.default)({
            store: new connect_mongo_1.default({
                mongoUrl: Config_1.default.database.uri,
            }),
            secret: String(Config_1.default.secret),
            saveUninitialized: false,
            resave: false,
            cookie: {
                secure: false,
                httpOnly: false,
                sameSite: false,
                maxAge: 1000 * 60 * 60 * 24,
            },
        }));
    }
    useRoute() {
        return __awaiter(this, void 0, void 0, function* () {
            route.useRoute(new AuthRoute_1.default(app, router));
            route.useRoute(new UserRoute_1.default(app, router));
            route.useRoute(new BarangRoute_1.default(app, router));
            route.useRoute(new KategoriRoute_1.default(app, router));
        });
    }
    runServer(port) {
        return __awaiter(this, void 0, void 0, function* () {
            let conn = yield mongoose_1.default
                .connect(String(Config_1.default.database.uri))
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
        });
    }
}
exports.default = App;
