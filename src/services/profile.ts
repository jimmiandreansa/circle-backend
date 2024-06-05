import db from "../db";
import { IEditProfile, IProfile } from "../types/app";

export const updateProfile = async (userId: number, payload: IProfile) => {
  const dataToUpdate: Partial<IEditProfile> = {};

  // Perbarui bidang bio jika diisi
  if (payload.bio !== undefined && payload.bio !== null) {
    dataToUpdate.bio = payload.bio;
  }

  // Perbarui bidang avatar jika diisi
  if (payload.avatar !== undefined && payload.avatar !== null) {
    dataToUpdate.avatar = payload.avatar;
  }

  // Perbarui bidang cover jika diisi
  if (payload.cover !== undefined && payload.cover !== null) {
    dataToUpdate.cover = payload.cover;
  }

  // Perbarui bidang fullname jika diisi
  if (payload.fullname !== undefined && payload.fullname !== null) {
    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        fullname: payload.fullname,
      },
    });
  }

  // Perbarui bidang username jika diisi
  if (payload.username !== undefined && payload.username !== null) {
    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        username: payload.username,
      },
    });
  }

  // Perbarui profil dengan data yang telah diupdate
  return await db.profile.update({
    where: {
      userId: userId,
    },
    data: dataToUpdate,
  });
};

// export const updateProfile = async (userId: number, payload: IProfile) => {
//   return await db.profile.update({
//       where: {
//           userId
//       },
//       data: {
//           ...payload
//       }
//   })
// }

export const getProfile = async (userId: number) => {
  return await db.profile.findFirst({
    where: {
      userId,
    },
    include: {
      user: {
        select: {
          username: true,
          fullname: true,
          id: true,
          follower: {
            select: {
              followingId: true
            }
          },
          following: {
            select: {
              followerId: true
            }
          }
        },
      },
    },
  });
};

export const getProfileById = async (userId: number) => {
  return await db.profile.findFirst({
    where: {
      id: userId,
    },
    include: {
      user: {
        select: {
          username: true,
          fullname: true,
          id: true,
          follower: {
            select: {
              followingId: true
            }
          },
          following: {
            select: {
              followerId: true
            }
          },
          thread: {
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
          },
        },
      },
    },
  });
};

export const getAllProfileUsers = async () => {
  return await db.user.findMany({
    include: {
      profile: {
        select: {
          avatar: true,
          cover: true,
        },
      },
      follower: true,
      following: true
    },
  });
}
