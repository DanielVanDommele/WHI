import { UUID } from "crypto";
import { Request, Response } from "express";

import { Presence } from "../entity/presence";
import PresencePersist from "../persistence/presencePersist";
import ControllerBase from "./ControllerBase";

export default class PresenceController extends ControllerBase {
    #baseUrl: string;
    #persist: PresencePersist;
  
    constructor(app: any, userSessions: any, persist: PresencePersist) {
      super(app, userSessions);

      this.#baseUrl = "/presence";
      this.#persist = persist;
    }
  
    setup() {
      this.getApp().get(`${this.#baseUrl}s`, (req: Request, res: Response) => this.#getAnyPresences(req, res));
      this.getApp().get(`${this.#baseUrl}/:personId`, (req: Request, res: Response) => this.#getPersonPresences(req, res));

      this.getApp().post(`${this.#baseUrl}/:personId`, (req: Request, res: Response) => this.#addPresence(req, res));
      this.getApp().post(`${this.#baseUrl}/:presenceId/plus/:personId`, (req: Request, res: Response) => this.#addPersonToPresence(req, res));

      this.getApp().put(`${this.#baseUrl}`, (req: Request, res: Response) => this.#updatePresence(req, res));

      this.getApp().delete(`${this.#baseUrl}/:presenceId/minus/:personId`, (req: Request, res: Response) => this.#removePersonFromPresence(req, res));
      this.getApp().delete(`${this.#baseUrl}/:personId`, (req: Request, res: Response) => this.#deletePresence(req, res));
    }

    validatePresence(presence: Presence): boolean {
      return this.validateId(presence.id) &&
             Array.isArray(presence.company) &&
             !isNaN(presence.context) &&
             !isNaN(presence.from) &&
             !isNaN(presence.to) &&
             presence.reason !== "" &&
             (presence.place !== null || this.validateId(presence.place));
    }

    #getAnyPresences(req: Request, res: Response) {
      const validator = () => true;
      const operation = () => this.#persist.getAnyPresences();
      this.handleRestCall(req, res, validator, operation);
    }

    #getPersonPresences(req: Request, res: Response) {
      const personId: UUID = this.uuidFromString(req.params.personId);
      const validator = () => this.validateId(personId);
      const operation = () => this.#persist.getPresences(personId);
      this.handleRestCall(req, res, validator, operation);
    }

    #addPresence(req: Request, res: Response) {
      const personId: UUID = this.uuidFromString(req.params.personId);
      const presence: Presence = req.body;
      const validator = () => this.validateId(personId) && this.validatePresence(presence);
      const operation = () => Promise.resolve(this.#persist.addPresence(presence, personId));
      this.handleRestCall(req, res, validator, operation);
    }

    #addPersonToPresence(req: Request, res: Response) {
      const personId: UUID = this.uuidFromString(req.params.personId);
      const presenceId: UUID = this.uuidFromString(req.params.presenceId);
      const validator = () => this.validateId(personId) && this.validateId(presenceId);
      const operation = () => Promise.resolve(this.#persist.addPersonToPresence(presenceId, personId));
      this.handleRestCall(req, res, validator, operation);
    }

    #updatePresence(req: Request, res: Response) {
      const presence: Presence = req.body;
      const validator = () => this.validatePresence(presence);
      const operation = () => Promise.resolve(this.#persist.updatePresence(presence));
      this.handleRestCall(req, res, validator, operation);
    }

    #removePersonFromPresence(req: Request, res: Response) {
      const personId: UUID = this.uuidFromString(req.params.personId);
      const presenceId: UUID = this.uuidFromString(req.params.presenceId);
      const validator = () => this.validateId(personId) && this.validateId(presenceId);
      const operation = () => Promise.resolve(this.#persist.removePersonFromPresence(presenceId, personId));
      this.handleRestCall(req, res, validator, operation);
    }

    #deletePresence(req: Request, res: Response) {
      const personId: UUID = this.uuidFromString(req.params.personId);
      const presence: Presence = req.body;
      const validator = () => this.validateId(personId) && this.validatePresence(presence);
      const operation = () => Promise.resolve(this.#persist.deletePresence(presence, personId));
      this.handleRestCall(req, res, validator, operation);
    }
  }