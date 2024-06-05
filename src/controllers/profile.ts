import { Request, Response } from "express";
import * as profileServices from "../services/profile";
import {v2 as cloudinary} from "cloudinary"

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user;
    const { body } = req;

    if (!req.files) {
      await profileServices.updateProfile(userId, body);
      res.json({status: true, message: "success"})

      return;
    }
    
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

        if (files.cover && files.cover.length > 0) {
            const cover = files.cover[0].filename;
            // body.cover = cover;
            const cloudinaryRes = await cloudinary.uploader.upload(
              "./src/uploads/" + cover
            );
            body.cover = cloudinaryRes.secure_url;
        }

        if (files.avatar && files.avatar.length > 0) {
            const avatar = files.avatar[0].filename;
            // body.avatar = avatar;
            const cloudinaryRes = await cloudinary.uploader.upload(
              "./src/uploads/" + avatar
            );
            body.avatar = cloudinaryRes.secure_url;
        }
        

        await profileServices.updateProfile(userId, body)
        res.json({
            status: true,
            message: "success",
        })
  } catch (error) {
    const err = error as unknown as Error;
    console.log(err);

    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user;
    const profile = await profileServices.getProfile(userId);

    res.json({
      status: true,
      message: "success",
      data: profile,
    });
  } catch (error) {
    const err = error as unknown as Error;
    console.log(err);

    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

export const getProfileById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const profile = await profileServices.getProfileById(+userId);

    res.json({
      status: true,
      message: "success",
      data: profile,
    });
  } catch (error) {
    const err = error as unknown as Error;
    console.log(err);

    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

export const getAllProfileUsers = async (req: Request, res: Response) => {
  try {
    const profile = await profileServices.getAllProfileUsers()

    res.json({
      status: true,
      message: "success",
      data: profile
    })
  } catch (error) {
    const err = error as unknown as Error;
    console.log(err);

    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
}
