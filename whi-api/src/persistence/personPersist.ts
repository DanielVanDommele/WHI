import { UUID } from "crypto";

import { Gender, Person, RelationType } from "../entity/person";
import PersistBase from "./PersistBase";

export default class PersonPersist extends PersistBase {
    initialize(): Promise<boolean>[] {
        // check if the person table exists in the database
        return [
            this.checkTableExistance('person', 'id TEXT PRIMARY KEY, name TEXT, gender INT, birthDate LONG, birthPlace TEXT, description TEXT, avatar BLOB'),
            this.checkTableExistance('personRelation', 'personId1 TEXT, personId2 TEXT, relationType INT, PRIMARY KEY (personId1, personId2)')
        ]
    }

    getPersons(): Promise<Person[]> {
        return this.retrieveList('SELECT * FROM person');
    }

    getPerson(id: UUID): Promise<Person> {
        return this.retrieve(`SELECT * FROM person WHERE id = '${id.toString()}'`)
    }

    getAllPersonRelations(id: UUID): Promise<Person[]> {
        return this.retrieveList(`SELECT person.* FROM person INNER JOIN personRelation ON person.id = personRelation.personId2 WHERE personRelation.personId1 = '${id.toString()}'`);
    }

    getSpecificPersonRelations(id: UUID, relationType: RelationType): Promise<Person[]> {
        return this.retrieveList(`SELECT person.s* FROM person INNER JOIN personRelation ON person.id = personRelation.personId2 WHERE personRelation.personId1 = '${id.toString()}' AND relationType = ${relationType}`);
    }

    addPerson(person: Person) {
        this.execute(`INSERT INTO person VALUES ('${person.id.toString()}', '${person.name}', ${person.gender}, ${person.birthDate}, '${person.birthPlace}', '${person.description}', '${person.avatar}')`)
    }

    addPersonRelation(id: UUID, relatedPerson: Person) {
        this.execute(`INSERT INTO personRelation VALUES ('${id.toString()}', '${relatedPerson.id.toString()}', ${relatedPerson.relationType})`)
    }

    updatePerson(person: Person) {
        this.execute(`UPDATE person SET name = '${person.name}', gender = ${person.gender}, birthDate = ${person.birthDate}, birthPlace = '${person.birthPlace}', description = '${person.description}', avatar = '${person.avatar}' WHERE id = '${person.id.toString()}'`)
    }

    deletePerson(id: UUID) {
        this.execute(`DELETE FROM person WHERE id = '${id.toString()}'`);
    }

    deletePersonRelation(id1: UUID, id2: UUID) {
        this.execute(`DELETE FROM personRelation WHERE personId1 = '${id1.toString()}' AND personId2 = '${id2.toString()}'`)
    }

    deleteAll() {
        this.execute('DELETE FROM personRelation');
        this.execute('DELETE FROM person');
    }
}