import express, { Response } from "express";

class ResponseData {
  private _res: Response;
  constructor(res: Response) {
    this._res = res;
  }
  resSuccess(
    status: boolean,
    message: string,
    data: any
  ): Response<any, Record<string, any>> {
    return this._res.status(200).json({
      status: status,
      message: message,
      data: data,
    });
  }

  resError(
    status: boolean,
    message: string,
    data: any
  ): express.Response<any, Record<string, any>> {
    return this._res.status(500).json({
      status: status,
      message: message,
      data: data,
    });
  }
}

export default ResponseData;
