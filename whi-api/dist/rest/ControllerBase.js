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
var _ControllerBase_app, _ControllerBase_userSessions, _ControllerBase_emptyGuid;
Object.defineProperty(exports, "__esModule", { value: true });
class ControllerBase {
    constructor(app, userSessions) {
        _ControllerBase_app.set(this, void 0);
        _ControllerBase_userSessions.set(this, void 0);
        _ControllerBase_emptyGuid.set(this, "00000000-0000-0000-0000-000000000000");
        __classPrivateFieldSet(this, _ControllerBase_app, app, "f");
        __classPrivateFieldSet(this, _ControllerBase_userSessions, userSessions, "f");
    }
    getApp() {
        return __classPrivateFieldGet(this, _ControllerBase_app, "f");
    }
    registerSessionForUser(sessionId, userId) {
        __classPrivateFieldGet(this, _ControllerBase_userSessions, "f")[sessionId] = userId;
    }
    unregisterSession(sessionId) {
        delete __classPrivateFieldGet(this, _ControllerBase_userSessions, "f")[sessionId];
    }
    uuidFromString(uuidStr) {
        if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uuidStr)) {
            return `${uuidStr.substring(0, 8)}-${uuidStr.substring(9, 13)}-${uuidStr.substring(14, 18)}-${uuidStr.substring(19, 23)}-${uuidStr.substring(24, 36)}`;
        }
        return __classPrivateFieldGet(this, _ControllerBase_emptyGuid, "f");
    }
    validateId(idToValidate) {
        return idToValidate !== __classPrivateFieldGet(this, _ControllerBase_emptyGuid, "f");
    }
    handleRestCall(req, res, validator, operation) {
        var _a;
        console.log(`REST call ${req.method} ${req.url} received`);
        if (this.isAuthorized(req, res) && this.isValidRequest(req, res, validator)) {
            const sessionId = (_a = req.get("sess")) !== null && _a !== void 0 ? _a : "";
            try {
                operation().then((data) => this.success(res, data, sessionId));
            }
            catch (errorCode) {
                console.error("error occured: ", errorCode);
                switch (errorCode) {
                    case "404":
                        this.notFound(res, sessionId);
                        break;
                    case "500":
                        this.internalError(res, sessionId);
                        break;
                }
            }
        }
    }
    isAuthorized(req, res) {
        var _a;
        const sessionId = (_a = req.get("sess")) !== null && _a !== void 0 ? _a : "";
        if (sessionId === "" || __classPrivateFieldGet(this, _ControllerBase_userSessions, "f")[sessionId] === undefined) {
            // there is no login or logged in user is not known
            res.status(403).send("you are not authorized");
            return false;
        }
        return true;
    }
    isValidRequest(req, res, validator) {
        console.log("isValidRequest", validator, validator());
        if (validator()) {
            return true;
        }
        res.status(400).send("bad request: your input is invalid");
        return false;
    }
    notFound(res, sessionId) {
        console.log('notFound');
        res.set("sess", sessionId);
        res.status(404).send("requested resource is not found");
    }
    internalError(res, sessionId) {
        console.log('internalError');
        res.set("sess", sessionId);
        res.status(500).send("internal server error");
    }
    success(res, data, sessionId) {
        console.log("call succesful: ", data);
        res.set("sess", sessionId);
        res.status(200).send(data);
    }
}
_ControllerBase_app = new WeakMap(), _ControllerBase_userSessions = new WeakMap(), _ControllerBase_emptyGuid = new WeakMap();
exports.default = ControllerBase;
