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
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
const controller = new AuthController_1.default();
class AuthRoute {
    constructor(app, router) {
        this._app = app;
        this._router = router;
    }
    routes() {
        return __awaiter(this, void 0, void 0, function* () {
            this._router.post("/login", (req, res) => {
                const data = {
                    username: req.body.username,
                    password: req.body.password,
                };
                controller.login(req, res, data);
            });
            this._app.use(this._router);
        });
    }
}
exports.default = AuthRoute;
