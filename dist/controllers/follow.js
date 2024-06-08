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
exports.getFollowingById = exports.getUserNotFollow = exports.getFollowings = exports.getFollowers = exports.follow = void 0;
const db_1 = __importDefault(require("../db"));
const followServices = __importStar(require("../services/follow"));
const follow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { followingId } = req.body;
        const followerId = res.locals.user;
        const follow = yield followServices.follow(followerId, followingId);
        res.json({
            success: true,
            message: follow,
        });
    }
    catch (error) {
        const err = error;
        console.log(err);
        res.status(500).json({
            status: false,
            message: err.message,
        });
    }
});
exports.follow = follow;
const getFollowers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = res.locals.user;
        const followers = yield db_1.default.follow.findMany({
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
    }
    catch (error) {
        const err = error;
        console.log(err);
        res.status(500).json({
            status: false,
            message: err.message,
        });
    }
});
exports.getFollowers = getFollowers;
const getFollowings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = res.locals.user;
        const followings = yield db_1.default.follow.findMany({
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
    }
    catch (error) {
        const err = error;
        console.log(err);
        res.status(500).json({
            status: false,
            message: err.message,
        });
    }
});
exports.getFollowings = getFollowings;
const getUserNotFollow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = res.locals.user;
        const users = yield db_1.default.follow.findMany({
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
    }
    catch (error) {
        const err = error;
        console.log(err);
        res.status(500).json({
            status: false,
            message: err.message,
        });
    }
});
exports.getUserNotFollow = getUserNotFollow;
const getFollowingById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { followingId } = req.body;
        const userId = res.locals.user;
        const followingById = yield db_1.default.follow.findFirst({
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
    }
    catch (error) {
        const err = error;
        console.log(err);
        res.status(500).json({
            status: false,
            message: err.message,
        });
    }
});
exports.getFollowingById = getFollowingById;
