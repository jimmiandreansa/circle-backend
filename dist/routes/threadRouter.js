"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uploads_1 = __importDefault(require("../middlewares/uploads"));
const authentication_1 = __importDefault(require("../middlewares/authentication"));
const thread_1 = require("../controllers/thread");
const threadRouter = (0, express_1.Router)();
threadRouter.post("/thread", authentication_1.default, (0, uploads_1.default)(), thread_1.createThread);
threadRouter.get("/threads", thread_1.getThreads);
threadRouter.get("/thread/:id", thread_1.getThread);
threadRouter.get("/my-thread", authentication_1.default, thread_1.getMyThread);
threadRouter.get("/thread-user/:userId", thread_1.getThreadByUserId);
threadRouter.get("/replies/:id", authentication_1.default, thread_1.getReplies);
threadRouter.delete("/thread/:threadId", authentication_1.default, thread_1.deleteThread);
exports.default = threadRouter;
