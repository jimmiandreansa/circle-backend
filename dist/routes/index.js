"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRouter_1 = __importDefault(require("./userRouter"));
const profileRouter_1 = __importDefault(require("./profileRouter"));
const threadRouter_1 = __importDefault(require("./threadRouter"));
const likeRouter_1 = __importDefault(require("./likeRouter"));
const followRouter_1 = __importDefault(require("./followRouter"));
const router = (0, express_1.Router)();
router.use("/", userRouter_1.default);
router.use("/", profileRouter_1.default);
router.use("/", threadRouter_1.default);
router.use("/", likeRouter_1.default);
router.use("/", followRouter_1.default);
exports.default = router;
