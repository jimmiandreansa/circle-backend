import db from "../db";
import { IThread } from "../types/app";

export const getThreads = async () => {
  return await db.thread.findMany({
    where: {
      threadId: null,
    },
    orderBy: {
      id: "desc",
    },
    include: {
      image: {
        select: {
          image: true,
        },
      },
      author: {
        select: {
          id: true,
          username: true,
          fullname: true,
          profile: {
            select: {
              avatar: true,
            },
          },
        },
      },
      _count: {
        select: {
          replies: true,
          like: true,
        },
      },
    },
  });
};

export const getThread = async (threadId: number) => {
  return await db.thread.findFirst({
    where: {
      id: threadId,
      threadId: null,
    },
    include: {
      image: {
        select: {
          image: true,
        },
      },
      author: {
        select: {
          id: true,
          username: true,
          fullname: true,
          profile: {
            select: {
              avatar: true,
            },
          },
        },
      },
      _count: {
        select: {
          replies: true,
          like: true,
        },
      },
    },
  });
};

export const getThreadByUserId = async (userId: number) => {
  return await db.thread.findMany({
    where: {
      userId: userId,
      threadId: null,
    },
    orderBy: {
      id: "desc",
    },
    include: {
      image: {
        select: {
          image: true,
        },
      },
      author: {
        select: {
          id: true,
          username: true,
          fullname: true,
          profile: {
            select: {
              avatar: true,
            },
          },
        },
      },
      _count: {
        select: {
          replies: true,
          like: true,
        },
      },
    },
  });
};

export const getMyThreads = async (userId: number) => {
  return await db.thread.findMany({
    where: {
      userId: userId,
      threadId: null,
    },
    orderBy: {
      id: "desc",
    },
    include: {
      image: {
        select: {
          image: true,
        },
      },
      author: {
        select: {
          id: true,
          username: true,
          fullname: true,
          profile: {
            select: {
              avatar: true,
            },
          },
        },
      },
      _count: {
        select: {
          replies: true,
          like: true,
        },
      },
    },
  });
};

export const createThread = async (payload: IThread) => {
  if (!payload.content && (!payload.images || payload.images.length === 0)) {
    throw new Error("Content or images are required to create a thread.");
  }

  const thread = await db.thread.create({
    data: {
      content: payload.content,
      userId: payload.userId,
      threadId: payload.threadId ? +payload.threadId : null,
    },
  });

  if (payload.images && payload.images.length > 0) {
    await db.threadImage.createMany({
      data: payload.images.map((image) => ({
        image: image.image,
        threadId: thread.id,
      })),
    });
  }

  return thread;
};

export const deleteThread = async (idThread: number, userId: number) => {
  const existedThread = await db.thread.findFirst({
    where: {
      id: idThread,
    },
  });

  if (!existedThread) {
    throw new Error("Thread not found");
  }

  if (existedThread.userId !== userId) {
    throw new Error("You don't have permission to delete this thread");
  }

  await db.thread.delete({
    where: {
      id: idThread,
    },
  });

  await db.threadImage.deleteMany({
    where: {
      threadId: idThread,
    },
  });

  return true;
};

export const getReplies = async (threadId: number) => {
  return await db.thread.findMany({
    where: {
      threadId,
    },
    orderBy: {
      id: "desc",
    },
    include: {
      image: {
        select: {
          image: true,
        },
      },
      author: {
        include: {
          profile: {
            select: {
              avatar: true,
            },
          },
        },
      },
      _count: {
        select: {
          replies: true,
          like: true,
        },
      },
    },
  });
};
