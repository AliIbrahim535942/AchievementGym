import express from "express";
import { IncomingHttpHeaders } from "http";

import { IUser } from "interfaces/user.ts";
declare global {
  namespace Express {
    interface Request<
      B = any,
      P = Record<string, string>,
      Q = Record<string, string | undefined>
    > {
      headers: IncomingHttpHeaders;
      body: B;
      params: P;
      query: Q;
      file?: Express.Multer.File; // Optional file property for multer
      user?: IUser;
    }
  }
}
