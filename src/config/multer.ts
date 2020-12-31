import path from 'path';
import multer from 'multer';
import crypto from 'crypto';
import aws from 'aws-sdk';
import multerS3 from 'multer-s3';

// CORRIGIR TIPO DE STORAGE
export default class MulterConfig {
  private storageTypes: object = {
    local: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, "..", "..", "tmp", "uploads"));
      },
      filename: (req, file, cb) => {
        crypto.randomBytes(16, (err, hash) => {
          if (err) cb(err, file.filename);

          const key = `${hash.toString("hex")}-${file.originalname}`;

          cb(null, key);
        });
      }
    }),
    s3: multerS3({
      s3: new aws.S3(),
      bucket: process.env.BUCKET_NAME as string,
      contentType: multerS3.AUTO_CONTENT_TYPE,
      acl: "public-read",
      key: (req, file, cb) => {
        crypto.randomBytes(16, (err, hash) => {
          if (err) cb(err);

          const fileName = `${hash.toString("hex")}-${file.originalname}`;

          cb(null, fileName);
        });
      }
    })
  };

  public config = {
    dest: path.resolve(__dirname, "..", "..", "tmp", "uploads"),
    storage: multerS3({
      s3: new aws.S3(),
      bucket: process.env.BUCKET_NAME as string,
      contentType: multerS3.AUTO_CONTENT_TYPE,
      acl: "public-read",
      key: (req, file, cb) => {
        crypto.randomBytes(16, (err, hash) => {
          if (err) cb(err);

          const fileName = `${hash.toString("hex")}-${file.originalname}`;

          cb(null, fileName);
        });
      }
    }),
    limits: {
      fileSize: 2 * 1024 * 1024
    },
    fileFilter: (req: any, file: any, cb: any) => {
      const allowedMimes = [
        "image/jpeg",
        "image/pjpeg",
        "image/png",
        "image/gif",
      ];

      if(allowedMimes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error("Invalid file type."));
      }
    }
  }
}
