import { Router } from "express";
import uploadMiddleware from "../middlewares/upload";
import cloudinary from "../libs/cloudinary"
import authentication from "../middlewares/authentication";
import {
  updateProfile,
  getProfile,
  getProfileById,
  getAllProfileUsers,
} from "../controllers/profile";

const profileRouter = Router();
// cloudinary.config()

profileRouter.patch(
  "/profile",
  authentication,
  uploadMiddleware(),
  updateProfile
);
profileRouter.get("/profile", authentication, getProfile);
profileRouter.get("/profile/:id", authentication, getProfile);
profileRouter.get("/detail-profile/:userId", getProfileById);
profileRouter.get("/all-profile", getAllProfileUsers);

export default profileRouter;
