import multer from "multer";
import path from "path";
import { Request ,Response} from "express";
import { NextFunction } from "express-serve-static-core";
const storage = multer.memoryStorage();

const fileFilter = (req: Request, file: Express.Multer.File, cb: Function) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only images (jpeg, jpg, png) are allowed"));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 },
});

const uploadOptional = (fieldName:string) => (req:Request, res:Response, next:NextFunction) => {
  const uploader = upload.single(fieldName);
  uploader(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: err.message });
    } else if (err) {
      return res.status(400).json({ error: err.message });
    }
    next();
  });
};

export { uploadOptional, upload };
