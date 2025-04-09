"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _UserManager_persist, _UserManager_controller;
Object.defineProperty(exports, "__esModule", { value: true });
const userPersist_1 = __importDefault(require("../persistence/userPersist"));
const userController_1 = __importDefault(require("../rest/userController"));
class UserManager {
    constructor(app, db, userSessions) {
        _UserManager_persist.set(this, void 0);
        _UserManager_controller.set(this, void 0);
        __classPrivateFieldSet(this, _UserManager_persist, new userPersist_1.default(db), "f");
        __classPrivateFieldSet(this, _UserManager_controller, new userController_1.default(app, userSessions, __classPrivateFieldGet(this, _UserManager_persist, "f")), "f");
    }
    activate() {
        __classPrivateFieldGet(this, _UserManager_persist, "f").initialize()
            .then(() => __classPrivateFieldGet(this, _UserManager_controller, "f").setup());
    }
}
_UserManager_persist = new WeakMap(), _UserManager_controller = new WeakMap();
exports.default = UserManager;
