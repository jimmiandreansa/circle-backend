import { Router } from "express";
import uploadMiddleware from "../middlewares/uploads";
import authentication from "../middlewares/authentication";
import {
  createThread,
  getReplies,
  getThread,
  getThreadByUserId,
  getThreads,
  deleteThread,
  getMyThread,
} from "../controllers/thread";

const threadRouter = Router();

threadRouter.post("/thread", authentication, uploadMiddleware(), createThread);
threadRouter.get("/threads", getThreads);
threadRouter.get("/thread/:id", getThread);
threadRouter.get("/my-thread", authentication, getMyThread);
threadRouter.get("/thread-user/:userId", getThreadByUserId);
threadRouter.get("/replies/:id", authentication, getReplies);
threadRouter.delete("/thread/:threadId", authentication, deleteThread);

export default threadRouter;
