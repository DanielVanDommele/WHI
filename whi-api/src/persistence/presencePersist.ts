import { randomUUID, UUID } from "crypto";
import PersistBase from "./PersistBase";
import { Context, Presence } from "../entity/presence";
import { Person } from "../entity/person";

export default class PresencePersist extends PersistBase {
    initialize(): Promise<boolean>[] {
        return [
            this.checkTableExistance('presence', 'id TEXT PRIMARY KEY, place TEXT, tfrom INT, tto INT, context INT, reason TEXT'),
            this.checkTableExistance('personPresence', 'personId TEXT, presenceId TEXT, PRIMARY KEY (personId, presenceId)')
        ];
    }

    getAnyPresences() : Promise<Presence[]> {
        return this.retrieveList("SELECT * FROM presence")
                .then(rows => {
                    return rows.map((row: any) => {
                        return {
                            id: row.id,
                            place: row.id,
                            from: row.tfrom,
                            to: row.tto,
                            company: [],
                            context: row.context,
                            reason: row.reason
                        }
                    });
                });
    }

    getPresences(personId: UUID): Promise<Presence[]> {
        const emptyGuid: UUID = '00000000-0000-0000-0000-000000000000';
        const selectQuery: string = [
            "SELECT Pr.id AS id, Pr.place AS place, Pr.tfrom AS tfrom, Pr.tto AS tto, Pr.context AS context, Pr.reason AS reason, Pe.id AS personId, Pe.name AS personName, Pe.gender AS personGender, Pe.birthDate AS personBirthDate, Pe.birthPlace AS personBirthPlace, Px.relationType AS relationType, Pe.description AS personDescription, Pe.avatar AS personAvatar",
            "FROM presence AS Pr INNER JOIN personPresence AS PpA ON (Pr.id = PpA.presenceId)",
            "LEFT JOIN personPresence AS PpB ON (Pr.id = PpB.presenceId)",
            "LEFT JOIN person AS Pe ON (Pe.id = PpB.personId)",
            "LEFT JOIN personRelation AS Px ON (Px.personId1 = PpA.personId AND Px.personId2 = PpB.personId)",
            `WHERE PpA.personId = '${personId.toString()}'`
        ].join(' ');
        return this.retrieveList(selectQuery)
                .then(rows => {
                    console.log(rows);
                    if (Array.isArray(rows)) {
                        const list: Presence[] = [];
                        let isFirst: boolean = true;
                        let id: UUID = emptyGuid;
                        let place: UUID = emptyGuid;
                        let from: number = -1;
                        let to: number =-1;
                        let company: Person[] = [];
                        let context: Context = Context.Unknown;
                        let reason: string = '';
                        rows.forEach((element: any) => {
                            if (!isFirst && element.id !== id) {
                                list.push({
                                    id: id,
                                    place: place,
                                    from: from,
                                    to: to,
                                    company: company,
                                    context: context,
                                    reason: reason
                                });
                                company = [];
                                id = element.id;
                            } else if (isFirst) {
                                id = element.id;
                            }
                            place = element.place;
                            from = element.tfrom;
                            to = element.tto;
                            context = element.context;
                            reason = element.reason;
                            if (element.personId !== personId) {
                                company.push({
                                    id: element.personId,
                                    name: element.personName,
                                    gender: element.personGender,
                                    birthDate: element.peronBirthDate,
                                    birthPlace: element.personBirthPlace,
                                    relationType: element.relationType,
                                    description: element.personDescription,
                                    avatar: element.personAvatar
                                });
                            }
                        });
                        if (id !== emptyGuid) {
                            list.push({
                                id: id,
                                place: place,
                                from: from,
                                to: to,
                                company: company,
                                context: context,
                                reason: reason
                            });
                        }
                        return list;
                    }
                    return [];
                });
    }

    addPresence(presence: Presence, personId: UUID) {
        console.log(presence, personId);
        try {
            this.execute(`INSERT INTO presence VALUES('${presence.id.toString()}', '${presence.place.toString()}', ${presence.from}, ${presence.to}, ${presence.context}, '${presence.reason}')`);
        } catch (e) {
            console.error('error while trying to add to presence table', e);
        }
        
        try {
            this.execute(`INSERT INTO personPresence VALUES('${personId.toString()}', '${presence.id.toString()}')`);
        } catch (e) {
            console.error('error while matching presence with person', e);
        }
    }

    addPersonToPresence(presenceId: UUID, personId: UUID) {
        this.execute(`INSERT INTO personPresence VALUES('${personId.toString()}', '${presenceId.toString()}')`);
    }

    removePersonFromPresence(presenceId: UUID, personId: UUID) {
        this.execute(`DELETE FROM personPresence WHERE personId = '${personId.toString()}' AND presenceId = '${presenceId.toString()}'`);
    }

    updatePresence(presence: Presence) {
        this.execute(`UPDATE presence SET context=${presence.context}, tfrom=${presence.from}, tto=${presence.to}, reason='${presence.reason}' WHERE id='${presence.id}'`);
    }

    deletePresence(presence: Presence, creatorPersonId: UUID) {
        for (const person of presence.company) {
            this.removePersonFromPresence(presence.id, person.id);
        }
        this.removePersonFromPresence(presence.id, creatorPersonId);
        this.execute(`DELETE FROM presence WHERE id = '${presence.id}'`);
    }
}