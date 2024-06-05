import { Request, Response } from "express";
import * as threadServices from "../services/thread";
// const { formatDistanceToNow } = require('date-fns');

export const getThreads = async (req: Request, res: Response) => {
  try {
    const threads = await threadServices.getThreads();

    // const timeDistance = formatDistanceToNow(new Date(threads.create), {
    //   addSuffix: true,
    // });
    // console.log(timeDistance);

    res.json({
      status: true,
      message: "success",
      data: threads,
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

export const getThread = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const thread = await threadServices.getThread(+id);

    res.json({
      status: true,
      message: "success",
      data: thread,
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

export const getThreadByUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const threadData = await threadServices.getThreadByUserId(+userId);

    res.json({
      status: true,
      message: "success",
      data: threadData,
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

export const getMyThread = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user;

    const threadData = await threadServices.getMyThreads(+userId);

    res.json({
      status: true,
      message: "success",
      data: threadData,
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

export const createThread = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    body.userId = res.locals.user;

    const thread = await threadServices.createThread(body);

    res.json({
      status: true,
      message: "success",
      data: thread,
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

export const getReplies = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const replies = await threadServices.getReplies(+id);

    res.json({
      status: true,
      message: "success",
      data: replies,
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

export const deleteThread = async (req: Request, res: Response) => {
  try {
    const { threadId } = req.params;
    const userId = res.locals.user;

    await threadServices.deleteThread(+threadId, userId);
    res.json({
      status: true,
      message: "success delete thread",
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
