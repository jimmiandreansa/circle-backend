import { Router } from "express";
import {
  register,
  login,
  getUsers,
  searchUser,
  getUserDetail,
  getUserSuggest,
  check,
} from "../controllers/user";
import authentication from "../middlewares/authentication";

const userRouter = Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/auth/check", authentication, check);
userRouter.get("/users", authentication, getUsers);
userRouter.get("/search-user", searchUser);
userRouter.get("/user-detail/:userId", getUserDetail);
userRouter.get("/user-suggest", authentication, getUserSuggest);

export default userRouter;
