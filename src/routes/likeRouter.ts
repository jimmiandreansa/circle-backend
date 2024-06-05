import { Router } from "express";
import authentication from "../middlewares/authentication";
import { createLike, getCurrentLike, getLikes } from "../controllers/like";

const likeRouter = Router();

likeRouter.post("/like", authentication, createLike);
likeRouter.get("/likes/:threadId", authentication, getLikes);
likeRouter.get("/like/:threadId", authentication, getCurrentLike);

export default likeRouter;
