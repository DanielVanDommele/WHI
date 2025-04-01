"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const personManager_1 = __importDefault(require("./manager/personManager"));
const placeManager_1 = __importDefault(require("./manager/placeManager"));
const presenceManager_1 = __importDefault(require("./manager/presenceManager"));
const userManager_1 = __importDefault(require("./manager/userManager"));
const userSessions = {};
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('data/whi');
const personManager = new personManager_1.default(app, db, userSessions);
const placeManager = new placeManager_1.default(app, db, userSessions);
const presenceManager = new presenceManager_1.default(app, db, userSessions);
const userManager = new userManager_1.default(app, db, userSessions);
db.serialize(() => {
    personManager.activate();
    placeManager.activate();
    presenceManager.activate();
    userManager.activate();
});
app.listen(3033, () => {
    console.log("WHI API started on port 3033");
});
