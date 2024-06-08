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
exports.getReplies = exports.deleteThread = exports.createThread = exports.getMyThreads = exports.getThreadByUserId = exports.getThread = exports.getThreads = void 0;
const db_1 = __importDefault(require("../db"));
const getThreads = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.thread.findMany({
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
});
exports.getThreads = getThreads;
const getThread = (threadId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.thread.findFirst({
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
});
exports.getThread = getThread;
const getThreadByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.thread.findMany({
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
});
exports.getThreadByUserId = getThreadByUserId;
const getMyThreads = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.thread.findMany({
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
});
exports.getMyThreads = getMyThreads;
const createThread = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!payload.content && (!payload.images || payload.images.length === 0)) {
        throw new Error("Content or images are required to create a thread.");
    }
    const thread = yield db_1.default.thread.create({
        data: {
            content: payload.content,
            userId: payload.userId,
            threadId: payload.threadId ? +payload.threadId : null,
        },
    });
    if (payload.images && payload.images.length > 0) {
        yield db_1.default.threadImage.createMany({
            data: payload.images.map((image) => ({
                image: image.image,
                threadId: thread.id,
            })),
        });
    }
    return thread;
});
exports.createThread = createThread;
const deleteThread = (idThread, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const existedThread = yield db_1.default.thread.findFirst({
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
    yield db_1.default.thread.delete({
        where: {
            id: idThread,
        },
    });
    yield db_1.default.threadImage.deleteMany({
        where: {
            threadId: idThread,
        },
    });
    return true;
});
exports.deleteThread = deleteThread;
const getReplies = (threadId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.thread.findMany({
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
});
exports.getReplies = getReplies;
