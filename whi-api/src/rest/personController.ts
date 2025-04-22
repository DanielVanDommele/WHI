import { Request, Response } from "express";

import { Person, RelationType } from "../entity/person";
import PersonPersist from "../persistence/personPersist";
import ControllerBase from "./ControllerBase";
import { UUID } from "crypto";

export default class PersonController extends ControllerBase {
    #baseUrl: string;
    persist: PersonPersist;
  
    constructor(app: any, userSessions: any, persist: PersonPersist) {
      super(app, userSessions);

      this.persist = persist;
      this.#baseUrl = "/person";
    }
  
    setup() {
      this.getApp().get(`${this.#baseUrl}s`, (req: Request, res: Response) => this.#getPersons(req, res));
      this.getApp().get(`${this.#baseUrl}/:id`, (req: Request, res: Response) => this.#getPerson(req, res));
      this.getApp().get(`${this.#baseUrl}/relations/:id`, (req: Request, res: Response) => this.#getPersonRelations(req, res));
      this.getApp().get(`${this.#baseUrl}/relations/:relationType/:id`, (req: Request, res: Response) => this.#getPersonSpecificRelations(req, res));

      this.getApp().post(`${this.#baseUrl}`, (req: Request, res: Response) => this.#addPerson(req, res));
      this.getApp().post(`${this.#baseUrl}/relations/:id`, (req: Request, res: Response) => this.#addPersonRelation(req, res));

      this.getApp().put(`${this.#baseUrl}/:id`, (req: Request, res: Response) => this.#updatePerson(req, res));

      this.getApp().delete(`${this.#baseUrl}/:id`, (req: Request, res: Response) => this.#deletePerson(req, res));
      this.getApp().delete(`${this.#baseUrl}/relations/:id1/:id2`, (req: Request, res: Response) => this.#deletePersonRelation(req, res));
      this.getApp().delete(`${this.#baseUrl}s/all`, (req: Request, res: Response) => this.#deleteAll(req, res));
    }

    #validatePerson(person: Person): boolean {
      return this.validateId(person.id) &&
             person.name !== "" &&
             !isNaN(person.relationType) &&
             !isNaN(person.gender) &&
             !isNaN(person.birthDate) &&
             (person.birthPlace === null || this.validateId(person.birthPlace));
    }

    #getPersons(req: Request, res: Response) {
      const validator = () => true;
      const operation = () => this.persist.getPersons();
      this.handleRestCall(req, res, validator, operation);
    }

    #getPerson(req: Request, res: Response) {
      const personId: UUID = this.uuidFromString(req.params.id);
      const validator = () => this.validateId(personId);
      const operation = () => this.persist.getPerson(personId);
      this.handleRestCall(req, res, validator, operation);
    }

    #getPersonRelations(req: Request, res: Response) {
      const personId: UUID = this.uuidFromString(req.params.id);
      const validator = () => this.validateId(personId);
      const operation = () => this.persist.getAllPersonRelations(personId);
      this.handleRestCall(req, res, validator, operation);
    }

    #getPersonSpecificRelations(req: Request, res: Response) {
      const personId: UUID = this.uuidFromString(req.params.id);
      const relationType: RelationType = parseInt(req.params.relationType, 10);
      const validator = () => this.validateId(personId) && !isNaN(relationType);
      const operation = () => this.persist.getSpecificPersonRelations(personId, relationType);
      this.handleRestCall(req, res, validator, operation);
    }
  
    #addPerson(req: Request, res: Response) {
      const person: Person = req.body;
      const validator = () => this.#validatePerson(person);
      const operation = () => Promise.resolve(this.persist.addPerson(person));
      this.handleRestCall(req, res, validator, operation);
    }

    #addPersonRelation(req: Request, res: Response) {
      const personId: UUID = this.uuidFromString(req.params.id);
      const relatedPerson: Person = req.body;
      const validator = () => this.validateId(personId) && this.#validatePerson(relatedPerson);
      const operation = () => Promise.resolve(this.persist.addPersonRelation(personId, relatedPerson));
      this.handleRestCall(req, res, validator, operation);
    }

    #updatePerson(req: Request, res: Response) {
      const person: Person = req.body;
      const validator = () => this.#validatePerson(person);
      const operation = () => Promise.resolve(this.persist.updatePerson(person));
      this.handleRestCall(req, res, validator, operation);
    }

    #deletePerson(req: Request, res: Response) {
      const personId: UUID = this.uuidFromString(req.params.id);
      const validator = () => this.validateId(personId);
      const operation = () => Promise.resolve(this.persist.deletePerson(personId));
      this.handleRestCall(req, res, validator, operation);
    }

    #deletePersonRelation(req: Request, res: Response) {
      const personId: UUID = this.uuidFromString(req.params.id1);
      const relatedPersonId: UUID = this.uuidFromString(req.params.id2);
      const validator = () => this.validateId(personId) && this.validateId(relatedPersonId);
      const operation = () => Promise.resolve(this.persist.deletePersonRelation(personId, relatedPersonId));
      this.handleRestCall(req, res, validator, operation);
    }

    #deleteAll(req: Request, res: Response) {
      console.log("deleteAll");
      const validator = () => true;
      console.log("validator value:", validator());
      const operation = () => Promise.resolve(this.persist.deleteAll());
      console.log("go to handleRestCall");
      this.handleRestCall(req, res, validator, operation);
    }
  }