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
const KategoriController_1 = __importDefault(require("../controllers/KategoriController"));
const controller = new KategoriController_1.default();
class KategoriRoute {
    constructor(app, router) {
        this._app = app;
        this._router = router;
    }
    routes() {
        return __awaiter(this, void 0, void 0, function* () {
            this._router.get("/get-all-kategori", (req, res) => {
                controller.setCondition(String(req.query.search));
                controller.getAllData(req, res);
            });
            this._router.post("/add-kategori", (req, res) => {
                const data = {
                    name: req.body.name,
                };
                controller.addData(req, res, data);
            });
            this._router.get("/get-kategori-by-id/:id", (req, res) => {
                controller.getDataById(req, res, req.params.id);
            });
            this._router.delete("/delete-kategori/:id", (req, res) => {
                controller.deleteDataById(req, res, req.params.id);
            });
            this._app.use(this._router);
        });
    }
}
exports.default = KategoriRoute;
