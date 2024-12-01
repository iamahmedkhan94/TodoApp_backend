import { Request, Response } from "express";
import { Session } from "express-session";

export interface AuthRequest extends Request {
  session: Session & { userId?: string };
}

export interface TodoResponse extends Response {
  status: any;
}
