import { UUID } from "crypto";
import { Request, Response } from "express";

export default class ControllerBase {
    #app: any;
    #userSessions: any;

    #emptyGuid: UUID = "00000000-0000-0000-0000-000000000000";

    constructor(app: any, userSessions: any) {
        this.#app = app;
        this.#userSessions = userSessions;
    }

    getApp(): any {
        return this.#app;
    }

    registerSessionForUser(sessionId: string, userId: string) {
        this.#userSessions[sessionId] = userId;
    }

    unregisterSession(sessionId: string) {
        delete this.#userSessions[sessionId];
    }

    uuidFromString(uuidStr: string): UUID {
        if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uuidStr)){ 
            return `${uuidStr.substring(0, 8)}-${uuidStr.substring(9, 13)}-${uuidStr.substring(14, 18)}-${uuidStr.substring(19, 23)}-${uuidStr.substring(24, 36)}`;
        }
        return this.#emptyGuid;
    }

    validateId(idToValidate: UUID): boolean {
        return idToValidate !== this.#emptyGuid;
    }

    handleRestCall(req: Request, res: Response, validator: Function, operation: Function) {
        console.log(`REST call ${req.url} received`); 
        if (this.isAuthorized(req, res) && this.isValidRequest(req, res, validator)) {
            const sessionId: string = req.get("sess") ?? "";
            try {
                operation().then((data: any) => this.success(res, data, sessionId));
            } catch (errorCode) {
                console.error("error occured: ", errorCode);
                switch(errorCode) {
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

    isAuthorized(req: Request, res: Response): boolean {
        const sessionId: string = req.get("sess") ?? "";
        if (sessionId === "" || this.#userSessions[sessionId] === undefined) {
            // there is no login or logged in user is not known
            res.status(403).send("you are not authorized");
            return false;
        }
        return true;
    }

    isValidRequest(req: Request, res: Response, validator: Function): boolean {
        console.log(validator());
        if (validator()) {
            return true;
        }
        res.status(400).send("bad request: your input is invalid");
        return false;
    }

    notFound(res: Response, sessionId: string) {
        console.log('notFound');
        res.set("sess", sessionId);
        res.status(404).send("requested resource is not found");
    }

    internalError(res: Response, sessionId: string) {
        console.log('internalError');
        res.set("sess", sessionId);
        res.status(500).send("internal server error");
    }

    success (res: Response, data: any, sessionId: string) {
        console.log("call succesful: ", data);
        res.set("sess", sessionId);
        res.status(200).send(data);
    }
}