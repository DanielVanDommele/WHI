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
var _PresenceController_instances, _PresenceController_baseUrl, _PresenceController_persist, _PresenceController_getAnyPresences, _PresenceController_getPersonPresences, _PresenceController_addPresence, _PresenceController_addPersonToPresence, _PresenceController_updatePresence, _PresenceController_removePersonFromPresence, _PresenceController_deletePresence, _PresenceController_deleteAll;
Object.defineProperty(exports, "__esModule", { value: true });
const ControllerBase_1 = __importDefault(require("./ControllerBase"));
class PresenceController extends ControllerBase_1.default {
    constructor(app, userSessions, persist) {
        super(app, userSessions);
        _PresenceController_instances.add(this);
        _PresenceController_baseUrl.set(this, void 0);
        _PresenceController_persist.set(this, void 0);
        __classPrivateFieldSet(this, _PresenceController_baseUrl, "/presence", "f");
        __classPrivateFieldSet(this, _PresenceController_persist, persist, "f");
    }
    setup() {
        this.getApp().get(`${__classPrivateFieldGet(this, _PresenceController_baseUrl, "f")}s`, (req, res) => __classPrivateFieldGet(this, _PresenceController_instances, "m", _PresenceController_getAnyPresences).call(this, req, res));
        this.getApp().get(`${__classPrivateFieldGet(this, _PresenceController_baseUrl, "f")}/:personId`, (req, res) => __classPrivateFieldGet(this, _PresenceController_instances, "m", _PresenceController_getPersonPresences).call(this, req, res));
        this.getApp().post(`${__classPrivateFieldGet(this, _PresenceController_baseUrl, "f")}/:personId`, (req, res) => __classPrivateFieldGet(this, _PresenceController_instances, "m", _PresenceController_addPresence).call(this, req, res));
        this.getApp().post(`${__classPrivateFieldGet(this, _PresenceController_baseUrl, "f")}/:presenceId/plus/:personId`, (req, res) => __classPrivateFieldGet(this, _PresenceController_instances, "m", _PresenceController_addPersonToPresence).call(this, req, res));
        this.getApp().put(`${__classPrivateFieldGet(this, _PresenceController_baseUrl, "f")}`, (req, res) => __classPrivateFieldGet(this, _PresenceController_instances, "m", _PresenceController_updatePresence).call(this, req, res));
        this.getApp().delete(`${__classPrivateFieldGet(this, _PresenceController_baseUrl, "f")}/:presenceId/minus/:personId`, (req, res) => __classPrivateFieldGet(this, _PresenceController_instances, "m", _PresenceController_removePersonFromPresence).call(this, req, res));
        this.getApp().delete(`${__classPrivateFieldGet(this, _PresenceController_baseUrl, "f")}/:personId`, (req, res) => __classPrivateFieldGet(this, _PresenceController_instances, "m", _PresenceController_deletePresence).call(this, req, res));
        this.getApp().delete(`${__classPrivateFieldGet(this, _PresenceController_baseUrl, "f")}s/all`, (req, res) => __classPrivateFieldGet(this, _PresenceController_instances, "m", _PresenceController_deleteAll).call(this, req, res));
    }
    validatePresence(presence) {
        return this.validateId(presence.id) &&
            Array.isArray(presence.company) &&
            !isNaN(presence.context) &&
            !isNaN(presence.from) &&
            !isNaN(presence.to) &&
            presence.reason !== "" &&
            (presence.place !== null || this.validateId(presence.place));
    }
}
_PresenceController_baseUrl = new WeakMap(), _PresenceController_persist = new WeakMap(), _PresenceController_instances = new WeakSet(), _PresenceController_getAnyPresences = function _PresenceController_getAnyPresences(req, res) {
    const validator = () => true;
    const operation = () => __classPrivateFieldGet(this, _PresenceController_persist, "f").getAnyPresences();
    this.handleRestCall(req, res, validator, operation);
}, _PresenceController_getPersonPresences = function _PresenceController_getPersonPresences(req, res) {
    const personId = this.uuidFromString(req.params.personId);
    const validator = () => this.validateId(personId);
    const operation = () => __classPrivateFieldGet(this, _PresenceController_persist, "f").getPresences(personId);
    this.handleRestCall(req, res, validator, operation);
}, _PresenceController_addPresence = function _PresenceController_addPresence(req, res) {
    const personId = this.uuidFromString(req.params.personId);
    const presence = req.body;
    const validator = () => this.validateId(personId) && this.validatePresence(presence);
    const operation = () => Promise.resolve(__classPrivateFieldGet(this, _PresenceController_persist, "f").addPresence(presence, personId));
    this.handleRestCall(req, res, validator, operation);
}, _PresenceController_addPersonToPresence = function _PresenceController_addPersonToPresence(req, res) {
    const personId = this.uuidFromString(req.params.personId);
    const presenceId = this.uuidFromString(req.params.presenceId);
    const validator = () => this.validateId(personId) && this.validateId(presenceId);
    const operation = () => Promise.resolve(__classPrivateFieldGet(this, _PresenceController_persist, "f").addPersonToPresence(presenceId, personId));
    this.handleRestCall(req, res, validator, operation);
}, _PresenceController_updatePresence = function _PresenceController_updatePresence(req, res) {
    const presence = req.body;
    const validator = () => this.validatePresence(presence);
    const operation = () => Promise.resolve(__classPrivateFieldGet(this, _PresenceController_persist, "f").updatePresence(presence));
    this.handleRestCall(req, res, validator, operation);
}, _PresenceController_removePersonFromPresence = function _PresenceController_removePersonFromPresence(req, res) {
    const personId = this.uuidFromString(req.params.personId);
    const presenceId = this.uuidFromString(req.params.presenceId);
    const validator = () => this.validateId(personId) && this.validateId(presenceId);
    const operation = () => Promise.resolve(__classPrivateFieldGet(this, _PresenceController_persist, "f").removePersonFromPresence(presenceId, personId));
    this.handleRestCall(req, res, validator, operation);
}, _PresenceController_deletePresence = function _PresenceController_deletePresence(req, res) {
    const personId = this.uuidFromString(req.params.personId);
    const presence = req.body;
    const validator = () => this.validateId(personId) && this.validatePresence(presence);
    const operation = () => Promise.resolve(__classPrivateFieldGet(this, _PresenceController_persist, "f").deletePresence(presence, personId));
    this.handleRestCall(req, res, validator, operation);
}, _PresenceController_deleteAll = function _PresenceController_deleteAll(req, res) {
    const validator = () => true;
    const operation = () => Promise.resolve(__classPrivateFieldGet(this, _PresenceController_persist, "f").deleteAll());
    this.handleRestCall(req, res, validator, operation);
};
exports.default = PresenceController;
