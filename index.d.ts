import express from "express";
import { IncomingHttpHeaders } from "http";

import { IUser } from "interfaces/user.ts";
declare global {
  namespace Express {
    interface Request<
      B = any,

    > {
      headers: IncomingHttpHeaders;
      body: B;
      file?: Express.Multer.File; // Optional file property for multer
      user?: IUser;
    }
  }
}
