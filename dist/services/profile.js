"use strict";
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
exports.getAllProfileUsers = exports.getProfileById = exports.getProfile = exports.updateProfile = void 0;
const db_1 = __importDefault(require("../db"));
const updateProfile = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const dataToUpdate = {};
    if (payload.bio !== undefined && payload.bio !== null) {
        dataToUpdate.bio = payload.bio;
    }
    if (payload.avatar !== undefined && payload.avatar !== null) {
        dataToUpdate.avatar = payload.avatar;
    }
    if (payload.cover !== undefined && payload.cover !== null) {
        dataToUpdate.cover = payload.cover;
    }
    if (payload.fullname !== undefined && payload.fullname !== null) {
        yield db_1.default.user.update({
            where: {
                id: userId,
            },
            data: {
                fullname: payload.fullname,
            },
        });
    }
    if (payload.username !== undefined && payload.username !== null) {
        yield db_1.default.user.update({
            where: {
                id: userId,
            },
            data: {
                username: payload.username,
            },
        });
    }
    return yield db_1.default.profile.update({
        where: {
            userId: userId,
        },
        data: dataToUpdate,
    });
});
exports.updateProfile = updateProfile;
const getProfile = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.profile.findFirst({
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
});
exports.getProfile = getProfile;
const getProfileById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.profile.findFirst({
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
});
exports.getProfileById = getProfileById;
const getAllProfileUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.user.findMany({
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
});
exports.getAllProfileUsers = getAllProfileUsers;
