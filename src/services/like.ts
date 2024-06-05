import db from "../db";

export const getLikes = async (threadId: number) => {
  return await db.thread.findMany({
    where: {
      threadId,
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
          like: true
        },
      },
    },
  });
}

export const createLike = async (payload: {
  threadId: number;
  userId: number;
}) => {
  const existedThread = await db.thread.findFirst({
    where: {
      id: payload.threadId
    }
  })

  if(!existedThread) {
    throw new Error("Thread not found")
  }

  const existedLike = await db.like.findFirst({
    where: {
      threadId: payload.threadId,
      userId: payload.userId
    }
  })

  if(existedLike) {
    await db.like.deleteMany({
      where: {
        threadId: payload.threadId,
        userId: payload.userId
      }
    })
    return "Unlike successful"
  }

  const like =  await db.like.create({
    data: {
      ...payload
    }
  })

  return "Like successful"
}

export const getCurrentLike = async (threadId: number, userId: number) => {
  return await db.like.findFirst({
    where: {
      threadId,
      userId
    }
  })
}