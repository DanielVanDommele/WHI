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
var _PresenceManager_persist, _PresenceManager_controller;
Object.defineProperty(exports, "__esModule", { value: true });
const presencePersist_1 = __importDefault(require("../persistence/presencePersist"));
const presenceController_1 = __importDefault(require("../rest/presenceController"));
class PresenceManager {
    constructor(app, db, userSessions) {
        _PresenceManager_persist.set(this, void 0);
        _PresenceManager_controller.set(this, void 0);
        __classPrivateFieldSet(this, _PresenceManager_persist, new presencePersist_1.default(db), "f");
        __classPrivateFieldSet(this, _PresenceManager_controller, new presenceController_1.default(app, userSessions, __classPrivateFieldGet(this, _PresenceManager_persist, "f")), "f");
    }
    activate() {
        Promise.all(__classPrivateFieldGet(this, _PresenceManager_persist, "f").initialize())
            .then(() => __classPrivateFieldGet(this, _PresenceManager_controller, "f").setup());
    }
}
_PresenceManager_persist = new WeakMap(), _PresenceManager_controller = new WeakMap();
exports.default = PresenceManager;
