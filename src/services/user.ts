import db from "../db";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IRegister } from "../types/app";
import { registerValidation } from "../libs/validation/register";

export const register = async (payload: IRegister) => {
  const { error, value } = registerValidation.validate(payload);
  if (error) {
    throw new Error(error.details[0].message);
  }

  const isExist = await db.user.findFirst({
    where: {
      OR: [{ username: value.username }, { email: value.email }],
    },
  });

  if (isExist) {
    throw new Error("Username or Email has already exist");
  }

  const hashedPassword = await bcrypt.hash(value.password, 10);

  value.password = hashedPassword;

  const user = await db.user.create({
    data: {
      ...value,
    },
  });

  const profile = await db.profile.create({
    data: {
      userId: user.id,
    },
  });

  return { user, profile };
};

export const login = async (
  username: string,
  password: string
): Promise<string> => {
  const user = await db.user.findFirst({
    where: {
      OR: [{ username }, { email: username }],
    },
  });

  if (!user) {
    throw new Error("User or password is not valid");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("User or password is not valid");
  }

  const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY!, {
    expiresIn: "3h",
  });

  return token;
};

export const check = async (reqbody: any) => {
  const user = await db.user.findFirst({
    where: {
      id: reqbody.id
    }
  })
}

export const getUsers = async (userId: number) => {
  return await db.user.findMany({
    where: {
      NOT: {
        id: userId,
      },
    },
    include: {
      follower: true,
      following: true,
      profile: {
        select: {
          avatar: true,
        },
      },
    },
  });
};

// export const getUser = async () => {
//   return await db.user.findFirst({
//     where: {
//       id: 1,
//     },
//   });
// };

export const searchUsers = async (query: string) => {
  return await db.user.findMany({
    where: {
      OR: [
        {
          username: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          fullname: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },
    include: {
      profile: {
        select: {
          avatar: true,
        },
      },
    },
  });
};

export const getUserDetail = async (userId: number) => {
  return await db.user.findFirst({
    where: {
      id: userId,
    },
    include: {
      profile: {
        select: {
          avatar: true,
          cover: true,
        },
      },
      follower: true,
      following: true,
    },
  });
};

export const getUserSuggest = async (userId: number) => {
  return await db.user.findMany({
    take: 4,
    select: {
      id: true,
      fullname: true,
      username: true,
      profile: {
        select: {
          avatar: true,
          cover: true,
          bio: true,
        },
      },
    },
    where: {
      id: {
        not: userId,
      },
      following: {
        none: {
          followerId: userId,
        },
      },
    },
  });
};
