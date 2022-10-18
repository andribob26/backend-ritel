import { Request, Response } from "express";
import Controller from "./Controller";
import { InUser } from "../models/interface_models/IUser";
import User from "../models/User";

class UserController extends Controller<InUser> {
  constructor() {
    super(User);
  }

  setCondition(value: string) {
    this._condition = {
      $or: [
        {
          name: {
            $regex: new RegExp(value),
            $options: "i",
          },
        },
        {
          role: {
            $regex: new RegExp(value),
            $options: "i",
          },
        },
      ],
    };
  }
}

export default UserController;
