import { Router } from "express";
import authentication from "../middlewares/authentication";
import { follow, getFollowers, getFollowingById, getFollowings, getUserNotFollow } from "../controllers/follow";

const followRouter = Router();

followRouter.post("/follow", authentication, follow);
followRouter.get("/follower", authentication, getFollowers);
followRouter.get("/following", authentication, getFollowings);
followRouter.post("/following-by-id", authentication, getFollowingById);
followRouter.post("/user-not-follow", authentication, getUserNotFollow);

export default followRouter;
