import { Request } from "express";

class GetBarrierToken {
  static set(req: Request) {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      return req.headers.authorization.split(" ")[1];
    }
    return null;
  }
}

export default GetBarrierToken;
