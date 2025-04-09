"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PersistBase_1 = __importDefault(require("./PersistBase"));
const presence_1 = require("../entity/presence");
class PresencePersist extends PersistBase_1.default {
    initialize() {
        return [
            this.checkTableExistance('presence', 'id TEXT PRIMARY KEY, place TEXT, tfrom INT, tto INT, context INT, reason TEXT'),
            this.checkTableExistance('personPresence', 'personId TEXT, presenceId TEXT, PRIMARY KEY (personId, presenceId)')
        ];
    }
    getAnyPresences() {
        return this.retrieveList("SELECT * FROM presence")
            .then(rows => {
            return rows.map((row) => {
                return {
                    id: row.id,
                    place: row.id,
                    from: row.tfrom,
                    to: row.tto,
                    company: [],
                    context: row.context,
                    reason: row.reason
                };
            });
        });
    }
    getPresences(personId) {
        const emptyGuid = '00000000-0000-0000-0000-000000000000';
        const selectQuery = [
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
                const list = [];
                let isFirst = true;
                let id = emptyGuid;
                let place = emptyGuid;
                let from = -1;
                let to = -1;
                let company = [];
                let context = presence_1.Context.Unknown;
                let reason = '';
                rows.forEach((element) => {
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
                    }
                    else if (isFirst) {
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
    addPresence(presence, personId) {
        console.log(presence, personId);
        try {
            this.execute(`INSERT INTO presence VALUES('${presence.id.toString()}', '${presence.place.toString()}', ${presence.from}, ${presence.to}, ${presence.context}, '${presence.reason}')`);
        }
        catch (e) {
            console.error('error while trying to add to presence table', e);
        }
        try {
            this.execute(`INSERT INTO personPresence VALUES('${personId.toString()}', '${presence.id.toString()}')`);
        }
        catch (e) {
            console.error('error while matching presence with person', e);
        }
    }
    addPersonToPresence(presenceId, personId) {
        this.execute(`INSERT INTO personPresence VALUES('${personId.toString()}', '${presenceId.toString()}')`);
    }
    removePersonFromPresence(presenceId, personId) {
        this.execute(`DELETE FROM personPresence WHERE personId = '${personId.toString()}' AND presenceId = '${presenceId.toString()}'`);
    }
    updatePresence(presence) {
        this.execute(`UPDATE presence SET context=${presence.context}, tfrom=${presence.from}, tto=${presence.to}, reason='${presence.reason}' WHERE id='${presence.id}'`);
    }
    deletePresence(presence, creatorPersonId) {
        for (const person of presence.company) {
            this.removePersonFromPresence(presence.id, person.id);
        }
        this.removePersonFromPresence(presence.id, creatorPersonId);
        this.execute(`DELETE FROM presence WHERE id = '${presence.id}'`);
    }
}
exports.default = PresencePersist;
