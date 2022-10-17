import { Request, Response } from "express";
interface IController {
  addData(req: Request, res: Response, data: any): any;
  getAllData(req: Request, res: Response, searchOption: any): any;
  getDataById(req: Request, res: Response, param: any): any;
  deleteDataById(req: Request, res: Response, param: any): any;
}

export default IController;
