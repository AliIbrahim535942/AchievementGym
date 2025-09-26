import { IncomingHttpHeaders } from "http";

import { Request } from "express";
import { IUser } from "./user.js";

export interface ApiRequest<T = any> extends Request {
  body: T;
  params: Record<string, string>;
  query: Record<string, string | undefined>;
  headers: IncomingHttpHeaders;
  file?: Express.Multer.File; // Optional file property for multer
  user?: IUser;
}
