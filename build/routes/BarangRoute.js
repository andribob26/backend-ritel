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
const BarangController_1 = __importDefault(require("../controllers/BarangController"));
const Middlewares_1 = __importDefault(require("../Middlewares"));
const Kategori_1 = __importDefault(require("../models/Kategori"));
const controller = new BarangController_1.default();
const middlewares = new Middlewares_1.default();
class BarangRoute {
    constructor(app, router) {
        this._app = app;
        this._router = router;
    }
    routes() {
        this._router.get("/get-all-barang", (req, res) => {
            controller.setCondition(String(req.query.search));
            controller.getAllData(req, res);
        });
        this._router.post("/add-barang", (req, res, next) => {
            middlewares.image(req, res, next);
        }, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const kategori = yield Kategori_1.default.findById(req.body.idKategori);
            const data = {
                kodeBarang: req.body.kodeBarang,
                name: req.body.name,
                kategori: {
                    _id: kategori._id,
                    name: kategori.name,
                },
                hpp: req.body.hpp,
                hargaJual: req.body.hargaJual,
                deskripsi: req.body.deskripsi,
                stok: 0,
            };
            controller.addDataWithImage(req, res, data);
        }));
        this._router.get("/get-barang-by-kode/:kode", (req, res) => {
            controller.getDataByKode(req, res, req.params.kode);
        });
        this._router.delete("/delete-barang/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
            controller.deleteDataByIdWithImage(req, res, req.params.id);
        }));
        this._router.put("/edit-barang/:id", (req, res, next) => {
            middlewares.image(req, res, next);
        }, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const kategori = yield Kategori_1.default.findById(req.body.idKategori);
            const data = {
                name: req.body.name,
                kategori: {
                    _id: kategori._id,
                    name: kategori.name,
                },
                hpp: req.body.hpp,
                hargaJual: req.body.hargaJual,
                deskripsi: req.body.deskripsi,
                stok: 0,
            };
            controller.editByIdWithImage(req, res, req.params.id, data);
        }));
        this._app.use(this._router);
    }
}
exports.default = BarangRoute;
