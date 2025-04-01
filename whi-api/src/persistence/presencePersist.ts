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

    getPresences(personId: UUID): Promise<Presence[]> {
        const selectQuery: string = [
            "SELECT Pr.id AS id, Pr.place AS place, Pr.tfrom AS tfrom, Pr.tto AS tto, Pe.id AS personId, Pe.name AS personName, Pe.gender AS personGender, Pe.birthDate AS personBirthDate, Px.relationType AS relationType, Pe.description AS personDescription, Pe.avatar AS personAvatar, Pr.context AS context, Pr.reason AS reason",
            "FROM presence AS Pr INNER JOIN personPresence AS Pp ON (Pr.id = Pp.presenceId)",
            "INNER JOIN personRelation AS Px ON (Pe.id = Px.personId1)",
            "INNER JOIN person AS Pe ON (Pe.id === Px.personId2)",
            `WHERE Pp.personId = '${personId.toString()}' AND Pe.id = Pr.personId`
        ].join('');
        return this.retrieveList(selectQuery)
                .then(rows => {
                    const list: Presence[] = [];
                    let isFirst: boolean = true;
                    let id: UUID = randomUUID();
                    let place: UUID = randomUUID();
                    let from: number = -1;
                    let to: number =-1;
                    let company: Person[] = [];
                    let context: Context = Context.Unknown;
                    let reason: string = '';
                    rows.array.forEach((element: any) => {
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
                        from = element.from;
                        to = element.to;
                        context = element.context;
                        reason = element.reason;
                        company.push({
                            id: element.personId,
                            name: element.personName,
                            gender: element.personGender,
                            birthDate: element.peronBirthDate,
                            birthPlace: null,
                            relationType: element.relationType,
                            description: element.personDescription,
                            avatar: element.personAvatar
                        });
                    });
                    if (company.length > 0) {
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
                });
    }

    addPresence(presence: Presence, personId: UUID) {
        this.execute(`INSERT INTO presence VALUES('${presence.id.toString()}', '${presence.place.toString()}', ${presence.from}, ${presence.to}, ${presence.context}, ${presence.reason})`);
        this.execute(`INSERT INTO personPresence VALUES('${personId.toString()}', '${presence.id.toString()}')`);
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