import { Request, Response } from "express";
import prisma from "../db";
import * as followServices from "../services/follow";

export const follow = async (req: Request, res: Response) => {
  try {
    const { followingId } = req.body;
    const followerId = res.locals.user;

    const follow = await followServices.follow(followerId, followingId);

    res.json({
      success: true,
      message: follow,
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

export const getFollowers = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user;

    const followers = await prisma.follow.findMany({
      where: {
        followingId: +userId,
      },
      select: {
        follower: {
          select: {
            id: true,
            fullname: true,
            username: true,
            profile: {
              select: {
                avatar: true,
              },
            },
          },
        },
      },
    });

    res.json({
      success: true,
      message: "success",
      data: followers,
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

export const getFollowings = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user;

    const followings = await prisma.follow.findMany({
      where: {
        followerId: +userId,
      },
      include: {
        following: {
          select: {
            id: true,
            fullname: true,
            username: true,
            profile: {
              select: {
                avatar: true,
              },
            },
          },
        },
      },
    });

    res.json({
      success: true,
      message: "success",
      data: followings,
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

export const getUserNotFollow = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user;

    const users = await prisma.follow.findMany({
      where: {
        NOT: {
          followerId: +userId,
        },
      },
      // include: {
      //   follower: {
      //     select: {
      //       id: true,
      //       fullname: true,
      //       username: true,
      //       profile: {
      //         select: {
      //           avatar: true,
      //         },
      //       },
      //     },
      //   },
      // },
    });

    res.json({
      success: true,
      message: "success",
      data: users,
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

export const getFollowingById = async (req: Request, res: Response) => {
  try {
    const { followingId } = req.body;
    const userId = res.locals.user;

    const followingById = await prisma.follow.findFirst({
      where: {
        followerId: +userId,
        followingId: +followingId,
      },
      include: {
        following: {
          select: {
            id: true,
            fullname: true,
            username: true,
            profile: {
              select: {
                avatar: true,
              },
            },
          },
        },
      },
    });

    res.json({
      success: true,
      message: "success",
      data: followingById,
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
