"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_1 = __importDefault(require("../middlewares/authentication"));
const follow_1 = require("../controllers/follow");
const followRouter = (0, express_1.Router)();
followRouter.post("/follow", authentication_1.default, follow_1.follow);
followRouter.get("/follower", authentication_1.default, follow_1.getFollowers);
followRouter.get("/following", authentication_1.default, follow_1.getFollowings);
followRouter.post("/following-by-id", authentication_1.default, follow_1.getFollowingById);
followRouter.post("/user-not-follow", authentication_1.default, follow_1.getUserNotFollow);
exports.default = followRouter;
