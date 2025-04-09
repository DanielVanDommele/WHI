"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PersistBase_1 = __importDefault(require("./PersistBase"));
class PersonPersist extends PersistBase_1.default {
    initialize() {
        // check if the person table exists in the database
        return [
            this.checkTableExistance('person', 'id TEXT PRIMARY KEY, name TEXT, gender INT, birthDate LONG, birthPlace TEXT, description TEXT, avatar BLOB'),
            this.checkTableExistance('personRelation', 'personId1 TEXT, personId2 TEXT, relationType INT, PRIMARY KEY (personId1, personId2)')
        ];
    }
    getPersons() {
        return this.retrieveList('SELECT * FROM person');
    }
    getPerson(id) {
        return this.retrieve(`SELECT * FROM person WHERE id = '${id.toString()}'`);
    }
    getAllPersonRelations(id) {
        return this.retrieveList(`SELECT person.* FROM person INNER JOIN personRelation ON person.id = personRelation.personId2 WHERE personRelation.personId1 = '${id.toString()}'`);
    }
    getSpecificPersonRelations(id, relationType) {
        return this.retrieveList(`SELECT person.s* FROM person INNER JOIN personRelation ON person.id = personRelation.personId2 WHERE personRelation.personId1 = '${id.toString()}' AND relationType = ${relationType}`);
    }
    addPerson(person) {
        this.execute(`INSERT INTO person VALUES ('${person.id.toString()}', '${person.name}', ${person.gender}, ${person.birthDate}, '${person.birthPlace}', '${person.description}', '${person.avatar}')`);
    }
    addPersonRelation(id, relatedPerson) {
        this.execute(`INSERT INTO personRelation VALUES ('${id.toString()}', '${relatedPerson.id.toString()}', ${relatedPerson.relationType})`);
    }
    updatePerson(person) {
        this.execute(`UPDATE person SET name = '${person.name}', gender = ${person.gender}, birthDate = ${person.birthDate}, birthPlace = '${person.birthPlace}', description = '${person.description}', avatar = '${person.avatar}' WHERE id = '${person.id.toString()}'`);
    }
    deletePerson(id) {
        this.execute(`DELETE FROM person WHERE id = '${id.toString()}'`);
    }
    deletePersonRelation(id1, id2) {
        this.execute(`DELETE FROM personRelation WHERE personId1 = '${id1.toString()}' AND personId2 = '${id2.toString()}'`);
    }
}
exports.default = PersonPersist;
