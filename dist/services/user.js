"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserSuggest = exports.getUserDetail = exports.searchUsers = exports.getUsers = exports.check = exports.login = exports.register = void 0;
const db_1 = __importDefault(require("../db"));
const bcrypt = __importStar(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register_1 = require("../libs/validation/register");
const register = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = register_1.registerValidation.validate(payload);
    if (error) {
        throw new Error(error.details[0].message);
    }
    const isExist = yield db_1.default.user.findFirst({
        where: {
            OR: [{ username: value.username }, { email: value.email }],
        },
    });
    if (isExist) {
        throw new Error("Username or Email has already exist");
    }
    const hashedPassword = yield bcrypt.hash(value.password, 10);
    value.password = hashedPassword;
    const user = yield db_1.default.user.create({
        data: Object.assign({}, value),
    });
    const profile = yield db_1.default.profile.create({
        data: {
            userId: user.id,
        },
    });
    return { user, profile };
});
exports.register = register;
const login = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.default.user.findFirst({
        where: {
            OR: [{ username }, { email: username }],
        },
    });
    if (!user) {
        throw new Error("User or password is not valid");
    }
    const isMatch = yield bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("User or password is not valid");
    }
    const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.SECRET_KEY, {
        expiresIn: "3h",
    });
    return token;
});
exports.login = login;
const check = (reqbody) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.default.user.findFirst({
        where: {
            id: reqbody.id
        }
    });
});
exports.check = check;
const getUsers = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.user.findMany({
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
});
exports.getUsers = getUsers;
// export const getUser = async () => {
//   return await db.user.findFirst({
//     where: {
//       id: 1,
//     },
//   });
// };
const searchUsers = (query) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.user.findMany({
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
});
exports.searchUsers = searchUsers;
const getUserDetail = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.user.findFirst({
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
});
exports.getUserDetail = getUserDetail;
const getUserSuggest = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.user.findMany({
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
});
exports.getUserSuggest = getUserSuggest;
