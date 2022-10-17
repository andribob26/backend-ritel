import { Session } from "express-session";

export interface ISession extends Session {
  user: {
    id: any;
    auth: boolean;
    username: string;
    name: string;
    telephone: string;
    email: string;
    role: string;
    token: any;
  };
}

export default ISession;
