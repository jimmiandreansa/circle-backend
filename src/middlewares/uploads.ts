import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { Request, Response, NextFunction } from "express";
import cloudinaryConfig from "../libs/cloudinary";
import path from "path";

cloudinaryConfig();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
}).fields([
  {
    name: "image",
    maxCount: 4,
  },
  {
    name: "avatar",
    maxCount: 1,
  },
  {
    name: "cover",
    maxCount: 1,
  },
]);

const multerMiddleware = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(401).json({
            status: false,
            message: "File too large",
          });
        }
        return res.status(500).json({
          status: false,
          message: err.message,
        });
      } else if (err) {
        return res.status(500).json({
          status: false,
          message: err,
        });
      }

      if (req.files) {
        try {
          const files = req.files as {
            [fieldName: string]: Express.Multer.File[];
          };
          const { image, avatar, cover } = files;

          if (image && image.length > 0) {
            const imagesUrls = await Promise.all(
              image.map(async (img) => {
                try {
                  const imageUrl = await cloudinary.uploader.upload(img.path, {
                    folder: "Threads",
                  });
                  return { image: imageUrl.secure_url };
                } catch (error) {
                  console.log("Error uploading image:", error);
                  throw error;
                }
              })
            );
            req.body.images = imagesUrls;
          }

          if (avatar && avatar.length > 0) {
            try {
              const avatarUrl = await cloudinary.uploader.upload(
                avatar[0].path,
                {
                  folder: "Profiles",
                }
              );
              req.body.avatar = avatarUrl.secure_url;
            } catch (error) {
              console.log("Error uploading avatar:", error);
              throw error;
            }
          }

          if (cover && cover.length > 0) {
            try {
              const coverUrl = await cloudinary.uploader.upload(cover[0].path, {
                folder: "Profiles",
              });
              req.body.cover = coverUrl.secure_url;
            } catch (error) {
              console.log("Error uploading cover:", error);
              throw error;
            }
          }
        } catch (error) {
          console.log("Error during file processing:", error);
          return res.status(500).json({
            status: false,
            message: "An error occurred while processing files",
          });
        }
      }

      next();
    });
  };
};

export default multerMiddleware;
