"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_1 = __importDefault(require("../middlewares/authentication"));
const like_1 = require("../controllers/like");
const likeRouter = (0, express_1.Router)();
likeRouter.post("/like", authentication_1.default, like_1.createLike);
likeRouter.get("/likes/:threadId", authentication_1.default, like_1.getLikes);
likeRouter.get("/like/:threadId", authentication_1.default, like_1.getCurrentLike);
exports.default = likeRouter;
