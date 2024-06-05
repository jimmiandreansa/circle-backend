import { Router } from "express";
import userRouter from "./userRouter";
import profileRouter from "./profileRouter";
import threadRouter from "./threadRouter";
import likeRouter from "./likeRouter";
import followRouter from "./followRouter";

const router = Router();

router.use("/", userRouter)
router.use("/", profileRouter)
router.use("/", threadRouter)
router.use("/", likeRouter)
router.use("/", followRouter)

export default router