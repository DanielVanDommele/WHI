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
var _PersonController_instances, _PersonController_baseUrl, _PersonController_validatePerson, _PersonController_getPersons, _PersonController_getPerson, _PersonController_getPersonRelations, _PersonController_getPersonSpecificRelations, _PersonController_addPerson, _PersonController_addPersonRelation, _PersonController_updatePerson, _PersonController_deletePerson, _PersonController_deletePersonRelation, _PersonController_deleteAll;
Object.defineProperty(exports, "__esModule", { value: true });
const ControllerBase_1 = __importDefault(require("./ControllerBase"));
class PersonController extends ControllerBase_1.default {
    constructor(app, userSessions, persist) {
        super(app, userSessions);
        _PersonController_instances.add(this);
        _PersonController_baseUrl.set(this, void 0);
        this.persist = persist;
        __classPrivateFieldSet(this, _PersonController_baseUrl, "/person", "f");
    }
    setup() {
        this.getApp().get(`${__classPrivateFieldGet(this, _PersonController_baseUrl, "f")}s`, (req, res) => __classPrivateFieldGet(this, _PersonController_instances, "m", _PersonController_getPersons).call(this, req, res));
        this.getApp().get(`${__classPrivateFieldGet(this, _PersonController_baseUrl, "f")}/:id`, (req, res) => __classPrivateFieldGet(this, _PersonController_instances, "m", _PersonController_getPerson).call(this, req, res));
        this.getApp().get(`${__classPrivateFieldGet(this, _PersonController_baseUrl, "f")}/relations/:id`, (req, res) => __classPrivateFieldGet(this, _PersonController_instances, "m", _PersonController_getPersonRelations).call(this, req, res));
        this.getApp().get(`${__classPrivateFieldGet(this, _PersonController_baseUrl, "f")}/relations/:relationType/:id`, (req, res) => __classPrivateFieldGet(this, _PersonController_instances, "m", _PersonController_getPersonSpecificRelations).call(this, req, res));
        this.getApp().post(`${__classPrivateFieldGet(this, _PersonController_baseUrl, "f")}`, (req, res) => __classPrivateFieldGet(this, _PersonController_instances, "m", _PersonController_addPerson).call(this, req, res));
        this.getApp().post(`${__classPrivateFieldGet(this, _PersonController_baseUrl, "f")}/relations/:id`, (req, res) => __classPrivateFieldGet(this, _PersonController_instances, "m", _PersonController_addPersonRelation).call(this, req, res));
        this.getApp().put(`${__classPrivateFieldGet(this, _PersonController_baseUrl, "f")}/:id`, (req, res) => __classPrivateFieldGet(this, _PersonController_instances, "m", _PersonController_updatePerson).call(this, req, res));
        this.getApp().delete(`${__classPrivateFieldGet(this, _PersonController_baseUrl, "f")}/:id`, (req, res) => __classPrivateFieldGet(this, _PersonController_instances, "m", _PersonController_deletePerson).call(this, req, res));
        this.getApp().delete(`${__classPrivateFieldGet(this, _PersonController_baseUrl, "f")}/relations/:id1/:id2`, (req, res) => __classPrivateFieldGet(this, _PersonController_instances, "m", _PersonController_deletePersonRelation).call(this, req, res));
        this.getApp().delete(`${__classPrivateFieldGet(this, _PersonController_baseUrl, "f")}s/all`, (req, res) => __classPrivateFieldGet(this, _PersonController_instances, "m", _PersonController_deleteAll).call(this, req, res));
    }
}
_PersonController_baseUrl = new WeakMap(), _PersonController_instances = new WeakSet(), _PersonController_validatePerson = function _PersonController_validatePerson(person) {
    return this.validateId(person.id) &&
        person.name !== "" &&
        !isNaN(person.relationType) &&
        !isNaN(person.gender) &&
        !isNaN(person.birthDate) &&
        (person.birthPlace === null || this.validateId(person.birthPlace));
}, _PersonController_getPersons = function _PersonController_getPersons(req, res) {
    const validator = () => true;
    const operation = () => this.persist.getPersons();
    this.handleRestCall(req, res, validator, operation);
}, _PersonController_getPerson = function _PersonController_getPerson(req, res) {
    const personId = this.uuidFromString(req.params.id);
    const validator = () => this.validateId(personId);
    const operation = () => this.persist.getPerson(personId);
    this.handleRestCall(req, res, validator, operation);
}, _PersonController_getPersonRelations = function _PersonController_getPersonRelations(req, res) {
    const personId = this.uuidFromString(req.params.id);
    const validator = () => this.validateId(personId);
    const operation = () => this.persist.getAllPersonRelations(personId);
    this.handleRestCall(req, res, validator, operation);
}, _PersonController_getPersonSpecificRelations = function _PersonController_getPersonSpecificRelations(req, res) {
    const personId = this.uuidFromString(req.params.id);
    const relationType = parseInt(req.params.relationType, 10);
    const validator = () => this.validateId(personId) && !isNaN(relationType);
    const operation = () => this.persist.getSpecificPersonRelations(personId, relationType);
    this.handleRestCall(req, res, validator, operation);
}, _PersonController_addPerson = function _PersonController_addPerson(req, res) {
    const person = req.body;
    const validator = () => __classPrivateFieldGet(this, _PersonController_instances, "m", _PersonController_validatePerson).call(this, person);
    const operation = () => Promise.resolve(this.persist.addPerson(person));
    this.handleRestCall(req, res, validator, operation);
}, _PersonController_addPersonRelation = function _PersonController_addPersonRelation(req, res) {
    const personId = this.uuidFromString(req.params.id);
    const relatedPerson = req.body;
    const validator = () => this.validateId(personId) && __classPrivateFieldGet(this, _PersonController_instances, "m", _PersonController_validatePerson).call(this, relatedPerson);
    const operation = () => Promise.resolve(this.persist.addPersonRelation(personId, relatedPerson));
    this.handleRestCall(req, res, validator, operation);
}, _PersonController_updatePerson = function _PersonController_updatePerson(req, res) {
    const person = req.body;
    const validator = () => __classPrivateFieldGet(this, _PersonController_instances, "m", _PersonController_validatePerson).call(this, person);
    const operation = () => Promise.resolve(this.persist.updatePerson(person));
    this.handleRestCall(req, res, validator, operation);
}, _PersonController_deletePerson = function _PersonController_deletePerson(req, res) {
    const personId = this.uuidFromString(req.params.id);
    const validator = () => this.validateId(personId);
    const operation = () => Promise.resolve(this.persist.deletePerson(personId));
    this.handleRestCall(req, res, validator, operation);
}, _PersonController_deletePersonRelation = function _PersonController_deletePersonRelation(req, res) {
    const personId = this.uuidFromString(req.params.id1);
    const relatedPersonId = this.uuidFromString(req.params.id2);
    const validator = () => this.validateId(personId) && this.validateId(relatedPersonId);
    const operation = () => Promise.resolve(this.persist.deletePersonRelation(personId, relatedPersonId));
    this.handleRestCall(req, res, validator, operation);
}, _PersonController_deleteAll = function _PersonController_deleteAll(req, res) {
    console.log("deleteAll");
    const validator = () => true;
    console.log("validator value:", validator());
    const operation = () => Promise.resolve(this.persist.deleteAll());
    console.log("go to handleRestCall");
    this.handleRestCall(req, res, validator, operation);
};
exports.default = PersonController;
