import mongoose, { Model } from "mongoose";

interface IUser extends mongoose.Document {
  name: string;
  username: string;
  password: string;
  telephone: string;
  email: string;
  role: string;
  lastLogin: any;
}
interface InstanceMethods {
  comparePassword: (candidatePass: any, callback: Function) => any;
}
interface InUser extends Model<IUser, {}, InstanceMethods> {
  comparePassword: (candidatePass: any, callback: Function) => any;
}

export { IUser, InUser, InstanceMethods };
