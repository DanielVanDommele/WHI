import { Request, Response } from "express";
import { UUID } from "crypto";

import Place from "../entity/place";
import PlacePersist from "../persistence/placePersist";
import ControllerBase from "./ControllerBase";

export default class PlaceController extends ControllerBase {
    #baseUrl: string;
    persist: PlacePersist;
  
    constructor(app: any, userSessions: any, persist: PlacePersist) {
      super(app, userSessions);

      this.#baseUrl = "/place";
      this.persist = persist;
    }
  
    setup() {
      this.getApp().get(`${this.#baseUrl}s`, (req: Request, res: Response) => this.#getPlaces(req, res));
      this.getApp().get(`${this.#baseUrl}/:id`, (req: Request, res: Response) => this.#getPlace(req, res));
      this.getApp().post(`${this.#baseUrl}`, (req: Request, res: Response) => this.#createPlace(req, res));
      this.getApp().put(`${this.#baseUrl}`, (req: Request, res: Response) => this.#updatePlace(req, res));
      this.getApp().delete(`${this.#baseUrl}/:id`, (req: Request, res: Response) => this.#deletePlace(req, res));
    }

    validatePlace(place: Place): boolean {
      return this.validateId(place.id) &&
             place.name !== "" &&
             !isNaN(place.lat) &&
             !isNaN(place.long);
    }

    #getPlaces (req: Request, res: Response) {
      const validator = () => true;
      const operation = () => this.persist.getPlaces();
      this.handleRestCall(req, res, validator, operation);
    }

    #getPlace (req: Request, res: Response) {
      const placeId: UUID = this.uuidFromString(req.params.id);
      const validator = () => this.validateId(placeId);
      const operation = () => this.persist.getPlace(placeId);
      this.handleRestCall(req, res, validator, operation);
    }

    #createPlace (req: Request, res: Response) {
      const place: Place = req.body;
      const validator = () => this.validatePlace(place);
      const operation = () => Promise.resolve(this.persist.addPlace(place));
      this.handleRestCall(req, res, validator, operation);
    }

    #updatePlace (req: any, res: any) {
      const place: Place = req.body;
      const validator = () => this.validatePlace(place);
      const operation = () => Promise.resolve(this.persist.updatePlace(place));
      this.handleRestCall(req, res, validator, operation);
    }

    #deletePlace (req: any, res: any) {
      const placeId: UUID = this.uuidFromString(req.params.id);
      const validator = () => this.validateId(placeId);
      const operation = () => Promise.resolve(this.persist.deletePlace(placeId));
      this.handleRestCall(req, res, validator, operation);
    }
  }