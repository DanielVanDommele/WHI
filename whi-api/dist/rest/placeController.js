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
var _PlaceController_instances, _PlaceController_baseUrl, _PlaceController_getPlaces, _PlaceController_getPlace, _PlaceController_createPlace, _PlaceController_updatePlace, _PlaceController_deletePlace, _PlaceController_deleteAll;
Object.defineProperty(exports, "__esModule", { value: true });
const ControllerBase_1 = __importDefault(require("./ControllerBase"));
class PlaceController extends ControllerBase_1.default {
    constructor(app, userSessions, persist) {
        super(app, userSessions);
        _PlaceController_instances.add(this);
        _PlaceController_baseUrl.set(this, void 0);
        __classPrivateFieldSet(this, _PlaceController_baseUrl, "/place", "f");
        this.persist = persist;
    }
    setup() {
        this.getApp().get(`${__classPrivateFieldGet(this, _PlaceController_baseUrl, "f")}s`, (req, res) => __classPrivateFieldGet(this, _PlaceController_instances, "m", _PlaceController_getPlaces).call(this, req, res));
        this.getApp().get(`${__classPrivateFieldGet(this, _PlaceController_baseUrl, "f")}/:id`, (req, res) => __classPrivateFieldGet(this, _PlaceController_instances, "m", _PlaceController_getPlace).call(this, req, res));
        this.getApp().post(`${__classPrivateFieldGet(this, _PlaceController_baseUrl, "f")}`, (req, res) => __classPrivateFieldGet(this, _PlaceController_instances, "m", _PlaceController_createPlace).call(this, req, res));
        this.getApp().put(`${__classPrivateFieldGet(this, _PlaceController_baseUrl, "f")}`, (req, res) => __classPrivateFieldGet(this, _PlaceController_instances, "m", _PlaceController_updatePlace).call(this, req, res));
        this.getApp().delete(`${__classPrivateFieldGet(this, _PlaceController_baseUrl, "f")}/:id`, (req, res) => __classPrivateFieldGet(this, _PlaceController_instances, "m", _PlaceController_deletePlace).call(this, req, res));
        this.getApp().delete(`${__classPrivateFieldGet(this, _PlaceController_baseUrl, "f")}s/all`, (req, res) => __classPrivateFieldGet(this, _PlaceController_instances, "m", _PlaceController_deleteAll).call(this, req, res));
    }
    validatePlace(place) {
        return this.validateId(place.id) &&
            place.name !== "" &&
            !isNaN(place.lat) &&
            !isNaN(place.long);
    }
}
_PlaceController_baseUrl = new WeakMap(), _PlaceController_instances = new WeakSet(), _PlaceController_getPlaces = function _PlaceController_getPlaces(req, res) {
    const validator = () => true;
    const operation = () => this.persist.getPlaces();
    this.handleRestCall(req, res, validator, operation);
}, _PlaceController_getPlace = function _PlaceController_getPlace(req, res) {
    const placeId = this.uuidFromString(req.params.id);
    const validator = () => this.validateId(placeId);
    const operation = () => this.persist.getPlace(placeId);
    this.handleRestCall(req, res, validator, operation);
}, _PlaceController_createPlace = function _PlaceController_createPlace(req, res) {
    const place = req.body;
    const validator = () => this.validatePlace(place);
    const operation = () => Promise.resolve(this.persist.addPlace(place));
    this.handleRestCall(req, res, validator, operation);
}, _PlaceController_updatePlace = function _PlaceController_updatePlace(req, res) {
    const place = req.body;
    const validator = () => this.validatePlace(place);
    const operation = () => Promise.resolve(this.persist.updatePlace(place));
    this.handleRestCall(req, res, validator, operation);
}, _PlaceController_deletePlace = function _PlaceController_deletePlace(req, res) {
    const placeId = this.uuidFromString(req.params.id);
    const validator = () => this.validateId(placeId);
    const operation = () => Promise.resolve(this.persist.deletePlace(placeId));
    this.handleRestCall(req, res, validator, operation);
}, _PlaceController_deleteAll = function _PlaceController_deleteAll(req, res) {
    const validator = () => true;
    const operation = () => Promise.resolve(this.persist.deleteAll());
    this.handleRestCall(req, res, validator, operation);
};
exports.default = PlaceController;
