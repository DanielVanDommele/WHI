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
var _UserController_instances, _UserController_baseUrl, _UserController_getUsers, _UserController_createUser, _UserController_updateUser, _UserController_deleteUser, _UserController_login, _UserController_logout;
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const ControllerBase_1 = __importDefault(require("./ControllerBase"));
class UserController extends ControllerBase_1.default {
    constructor(app, userSessions, persist) {
        super(app, userSessions);
        _UserController_instances.add(this);
        _UserController_baseUrl.set(this, void 0);
        __classPrivateFieldSet(this, _UserController_baseUrl, "/user", "f");
        this.persist = persist;
    }
    setup() {
        this.getApp().get(`${__classPrivateFieldGet(this, _UserController_baseUrl, "f")}s`, (req, res) => __classPrivateFieldGet(this, _UserController_instances, "m", _UserController_getUsers).call(this, req, res));
        this.getApp().post(`${__classPrivateFieldGet(this, _UserController_baseUrl, "f")}`, (req, res) => __classPrivateFieldGet(this, _UserController_instances, "m", _UserController_createUser).call(this, req, res));
        this.getApp().put(`${__classPrivateFieldGet(this, _UserController_baseUrl, "f")}`, (req, res) => __classPrivateFieldGet(this, _UserController_instances, "m", _UserController_updateUser).call(this, req, res));
        this.getApp().delete(`${__classPrivateFieldGet(this, _UserController_baseUrl, "f")}/:id`, (req, res) => __classPrivateFieldGet(this, _UserController_instances, "m", _UserController_deleteUser).call(this, req, res));
        this.getApp().post(`${__classPrivateFieldGet(this, _UserController_baseUrl, "f")}/login`, (req, res) => __classPrivateFieldGet(this, _UserController_instances, "m", _UserController_login).call(this, req, res));
        this.getApp().post(`${__classPrivateFieldGet(this, _UserController_baseUrl, "f")}/logout`, (req, res) => __classPrivateFieldGet(this, _UserController_instances, "m", _UserController_logout).call(this, req, res));
    }
    validateEmail(emailAddress) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress);
    }
}
_UserController_baseUrl = new WeakMap(), _UserController_instances = new WeakSet(), _UserController_getUsers = function _UserController_getUsers(req, res) {
    console.log('REST call get:users received');
    const validator = () => true;
    const operation = () => this.persist.getUsers();
    this.handleRestCall(req, res, validator, operation);
}, _UserController_createUser = function _UserController_createUser(req, res) {
    const user = req.body;
    console.log("REST call post:/user received");
    try {
        this.persist.addUser(user);
        console.log("call succesful: ", user);
        res.status(200).send(true);
    }
    catch (error) {
        console.error("error whilst posting data:", error);
        res.status(400).send(error);
    }
}, _UserController_updateUser = function _UserController_updateUser(req, res) {
    const user = req.body;
    const validator = () => {
        return this.validateId(user.id) &&
            this.validateEmail(user.email) &&
            user.password !== "" &&
            this.validateId(user.personId);
    };
    const operation = () => {
        return this.persist.getUser(user.id)
            .then((userCurrently) => {
            if (user.email !== userCurrently.email) {
                this.persist.updateUserField(user.id, "email", user.email);
            }
            if (user.password !== userCurrently.password) {
                this.persist.updateUserField(user.id, "password", user.password);
            }
            if (user.active !== userCurrently.active) {
                this.persist.updateUserField(user.id, "active", user.active);
            }
            return true;
        })
            .catch(() => false);
    };
    this.handleRestCall(req, res, validator, operation);
}, _UserController_deleteUser = function _UserController_deleteUser(req, res) {
    const userId = this.uuidFromString(req.params.id);
    const validator = () => this.validateId(userId);
    const operation = () => Promise.resolve(this.persist.deleteUser(userId));
    this.handleRestCall(req, res, validator, operation);
}, _UserController_login = function _UserController_login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const loginDate = req.body;
        console.log(`REST call post:/user/login received`);
        try {
            const user = yield this.persist.getUserByEmail(loginDate.email);
            if (user && user.password === loginDate.password) {
                this.persist.updateUserField(user.id, "lastLogin", (new Date().getTime()));
                const sessionId = (0, crypto_1.randomUUID)();
                this.registerSessionForUser(sessionId, user.id);
                console.log("login succesful");
                res.status(200).send({
                    sessionid: sessionId,
                    lastLogin: user.lastLogin
                });
            }
            else {
                console.error("error while login (invalid input):");
                res.status(404).send("invalid emailaddress or password");
            }
        }
        catch (error) {
            console.error("error while login (invalid input):", error);
            res.status(404).send("invalid emailaddress or password");
        }
    });
}, _UserController_logout = function _UserController_logout(req, res) {
    var _a;
    const sessionId = (_a = req.get('sess')) !== null && _a !== void 0 ? _a : "";
    ;
    this.unregisterSession(sessionId);
    res.status(200).send(true);
};
exports.default = UserController;
