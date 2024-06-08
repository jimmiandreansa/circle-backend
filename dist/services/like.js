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
exports.getCurrentLike = exports.createLike = exports.getLikes = void 0;
const db_1 = __importDefault(require("../db"));
const getLikes = (threadId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.thread.findMany({
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
});
exports.getLikes = getLikes;
const createLike = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existedThread = yield db_1.default.thread.findFirst({
        where: {
            id: payload.threadId
        }
    });
    if (!existedThread) {
        throw new Error("Thread not found");
    }
    const existedLike = yield db_1.default.like.findFirst({
        where: {
            threadId: payload.threadId,
            userId: payload.userId
        }
    });
    if (existedLike) {
        yield db_1.default.like.deleteMany({
            where: {
                threadId: payload.threadId,
                userId: payload.userId
            }
        });
        return "Unlike successful";
    }
    const like = yield db_1.default.like.create({
        data: Object.assign({}, payload)
    });
    return "Like successful";
});
exports.createLike = createLike;
const getCurrentLike = (threadId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.like.findFirst({
        where: {
            threadId,
            userId
        }
    });
});
exports.getCurrentLike = getCurrentLike;
