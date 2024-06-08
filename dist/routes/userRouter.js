"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const authentication_1 = __importDefault(require("../middlewares/authentication"));
const userRouter = (0, express_1.Router)();
userRouter.post("/register", user_1.register);
userRouter.post("/login", user_1.login);
userRouter.get("/auth/check", authentication_1.default, user_1.check);
userRouter.get("/users", authentication_1.default, user_1.getUsers);
userRouter.get("/search-user", user_1.searchUser);
userRouter.get("/user-detail/:userId", user_1.getUserDetail);
userRouter.get("/user-suggest", authentication_1.default, user_1.getUserSuggest);
exports.default = userRouter;
