import { randomUUID, UUID } from "crypto";
import { Request, Response } from "express";

import User from "../entity/user";
import UserPersist from "../persistence/userPersist";
import ControllerBase from "./ControllerBase";

interface LoginData {
  email: string;
  password: string;
}

export default class UserController extends ControllerBase {
  #baseUrl: string;
  persist: UserPersist;

  constructor(app: any, userSessions: any, persist: UserPersist) {
    super(app, userSessions);
    this.#baseUrl = "/user";
    this.persist = persist;
  }

  setup() {
    this.getApp().get(`${this.#baseUrl}s`, (req: Request, res: Response) => this.#getUsers(req, res));

    this.getApp().post(`${this.#baseUrl}`, (req: Request, res: Response) => this.#createUser(req, res));
    this.getApp().put(`${this.#baseUrl}`, (req: Request, res: Response) => this.#updateUser(req, res));
    this.getApp().delete(`${this.#baseUrl}/:id`, (req: Request, res: Response) => this.#deleteUser(req, res));

    this.getApp().post(`${this.#baseUrl}/login`, (req: Request, res: Response) => this.#login(req, res));
    this.getApp().post(`${this.#baseUrl}/logout`, (req: Request, res: Response) => this.#logout(req, res));
  }

  validateEmail(emailAddress: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress);
  } 

  #getUsers(req: Request, res: Response) {
    console.log('REST call get:users received');
    const validator = () => true;
    const operation = () => this.persist.getUsers();
    this.handleRestCall(req, res, validator, operation);
  }

  #createUser(req: Request, res: Response) {
    const user: User = req.body;
    console.log("REST call post:/user received");
    try {
      this.persist.addUser(user);
      console.log("call succesful: ", user);
      res.status(200).send(true);
    } catch (error: any) {
      console.error("error whilst posting data:", error);
      res.status(400).send(error);
    }
  }

  #updateUser(req: Request, res: Response) {
    const user: User = req.body;
    const validator = () => {
      return this.validateId(user.id) &&
             this.validateEmail(user.email) &&
             user.password !== "" &&
             this.validateId(user.personId);
    };
    const operation = () => {
      return this.persist.getUser(user.id)
            .then((userCurrently: User) => {
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
  }

  #deleteUser(req: Request, res: Response) {
    const userId: UUID  = this.uuidFromString(req.params.id);
    const validator = () => this.validateId(userId);
    const operation = () => Promise.resolve(this.persist.deleteUser(userId));
    this.handleRestCall(req, res, validator, operation);
  }

  async #login(req: Request, res: Response) {
    const loginDate: LoginData = req.body;
    console.log(`REST call post:/user/login received`);
    try {
      const user: User = await this.persist.getUserByEmail(loginDate.email);
      if (user && user.password === loginDate.password) {
        this.persist.updateUserField(user.id, "lastLogin", (new Date().getTime()));

        const sessionId = randomUUID();
        this.registerSessionForUser(sessionId, user.id);
        console.log("login succesful");
        res.status(200).send({
          sessionid: sessionId,
          lastLogin: user.lastLogin
        });
      } else {
        console.error("error while login (invalid input):");
        res.status(404).send("invalid emailaddress or password");  
      }
    } catch (error: any) {
      console.error("error while login (invalid input):", error);
      res.status(404).send("invalid emailaddress or password");
    }
  }

  #logout(req: Request, res: Response) {
    const sessionId: string = req.get('sess') ?? "";;
    this.unregisterSession(sessionId);
    res.status(200).send(true);
  }
}