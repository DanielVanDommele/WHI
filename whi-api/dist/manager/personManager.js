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
var _PersonManager_persist, _PersonManager_controller;
Object.defineProperty(exports, "__esModule", { value: true });
const personPersist_1 = __importDefault(require("../persistence/personPersist"));
const personController_1 = __importDefault(require("../rest/personController"));
class PersonManager {
    constructor(app, db, userSessions) {
        _PersonManager_persist.set(this, void 0);
        _PersonManager_controller.set(this, void 0);
        __classPrivateFieldSet(this, _PersonManager_persist, new personPersist_1.default(db), "f");
        __classPrivateFieldSet(this, _PersonManager_controller, new personController_1.default(app, userSessions, __classPrivateFieldGet(this, _PersonManager_persist, "f")), "f");
    }
    activate() {
        Promise.all(__classPrivateFieldGet(this, _PersonManager_persist, "f").initialize())
            .then(() => __classPrivateFieldGet(this, _PersonManager_controller, "f").setup());
    }
}
_PersonManager_persist = new WeakMap(), _PersonManager_controller = new WeakMap();
exports.default = PersonManager;
