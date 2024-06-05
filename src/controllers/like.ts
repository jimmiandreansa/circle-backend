import { Request, Response } from "express"
import * as likeServices from "../services/like"

export const getLikes = async (req: Request, res: Response) => {
  try {
    const {threadId} = req.params
    const likes = await likeServices.getLikes(+threadId)

    res.json({
      status: true,
      message: "success",
      data: {
        user: likes
      }
    })
  } catch(error) {
    const err = error as unknown as Error;
    console.log(err);

    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
}

export const createLike = async (req: Request, res: Response) => {
  try {
    const {threadId} = req.body
    const userId = res.locals.user
    const like = await likeServices.createLike({
      threadId,
      userId
    })

    res.json({
      status: true,
      message: like
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

export const getCurrentLike = async (req: Request, res: Response) => {
  try{
    const {threadId} = req.params
    const userId = res.locals.user
    const like = await likeServices.getCurrentLike(+threadId, +userId)

    res.json({
      status: true,
      message: like,
      data: {
        like
      }
    })
  } catch(error) {
    const err = error as unknown as Error;
    console.log(err);

    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
}