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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = sendMail;
const cloudmailin_1 = require("cloudmailin");
const USER_NAME = "1aec506dea731b2f";
const API_KEY = "jNBfEiU1v1NnLetm7rLZfDf9";
function sendMail(to, subject, html) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new cloudmailin_1.MessageClient({ username: USER_NAME, apiKey: API_KEY });
        const response = yield client.sendMessage({
            to: to,
            from: "noreply@whi.net",
            html: html,
            subject: subject
        });
    });
}
