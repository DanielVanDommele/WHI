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
var _PlaceManager_persist, _PlaceManager_controller;
Object.defineProperty(exports, "__esModule", { value: true });
const placePersist_1 = __importDefault(require("../persistence/placePersist"));
const placeController_1 = __importDefault(require("../rest/placeController"));
class PlaceManager {
    constructor(app, db, userSessions) {
        _PlaceManager_persist.set(this, void 0);
        _PlaceManager_controller.set(this, void 0);
        __classPrivateFieldSet(this, _PlaceManager_persist, new placePersist_1.default(db), "f");
        __classPrivateFieldSet(this, _PlaceManager_controller, new placeController_1.default(app, userSessions, __classPrivateFieldGet(this, _PlaceManager_persist, "f")), "f");
    }
    activate() {
        __classPrivateFieldGet(this, _PlaceManager_persist, "f").initialize()
            .then(() => __classPrivateFieldGet(this, _PlaceManager_controller, "f").setup());
    }
}
_PlaceManager_persist = new WeakMap(), _PlaceManager_controller = new WeakMap();
exports.default = PlaceManager;
