"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = __importDefault(require("./App"));
const port = Number(process.env.PORT) || 2000;
const app = new App_1.default();
app.useRoute();
app.runServer(port);
