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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteThread = exports.getReplies = exports.createThread = exports.getMyThread = exports.getThreadByUserId = exports.getThread = exports.getThreads = void 0;
const threadServices = __importStar(require("../services/thread"));
// const { formatDistanceToNow } = require('date-fns');
const getThreads = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const threads = yield threadServices.getThreads();
        // const timeDistance = formatDistanceToNow(new Date(threads.create), {
        //   addSuffix: true,
        // });
        // console.log(timeDistance);
        res.json({
            status: true,
            message: "success",
            data: threads,
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
exports.getThreads = getThreads;
const getThread = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const thread = yield threadServices.getThread(+id);
        res.json({
            status: true,
            message: "success",
            data: thread,
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
exports.getThread = getThread;
const getThreadByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const threadData = yield threadServices.getThreadByUserId(+userId);
        res.json({
            status: true,
            message: "success",
            data: threadData,
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
exports.getThreadByUserId = getThreadByUserId;
const getMyThread = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = res.locals.user;
        const threadData = yield threadServices.getMyThreads(+userId);
        res.json({
            status: true,
            message: "success",
            data: threadData,
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
exports.getMyThread = getMyThread;
const createThread = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        body.userId = res.locals.user;
        const thread = yield threadServices.createThread(body);
        res.json({
            status: true,
            message: "success",
            data: thread,
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
exports.createThread = createThread;
const getReplies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const replies = yield threadServices.getReplies(+id);
        res.json({
            status: true,
            message: "success",
            data: replies,
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
exports.getReplies = getReplies;
const deleteThread = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { threadId } = req.params;
        const userId = res.locals.user;
        yield threadServices.deleteThread(+threadId, userId);
        res.json({
            status: true,
            message: "success delete thread",
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
exports.deleteThread = deleteThread;
