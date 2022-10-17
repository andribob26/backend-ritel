import { Session } from "express-session";

export interface ISession extends Session {
  user?: { [key: string]: any };
}

export default ISession;
