"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const upload_1 = __importDefault(require("../middlewares/upload"));
const authentication_1 = __importDefault(require("../middlewares/authentication"));
const profile_1 = require("../controllers/profile");
const profileRouter = (0, express_1.Router)();
// cloudinary.config()
profileRouter.patch("/profile", authentication_1.default, (0, upload_1.default)(), profile_1.updateProfile);
profileRouter.get("/profile", authentication_1.default, profile_1.getProfile);
profileRouter.get("/profile/:id", authentication_1.default, profile_1.getProfile);
profileRouter.get("/detail-profile/:userId", profile_1.getProfileById);
profileRouter.get("/all-profile", profile_1.getAllProfileUsers);
exports.default = profileRouter;
