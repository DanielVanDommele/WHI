"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PersistBase_1 = __importDefault(require("./PersistBase"));
class PlacePersist extends PersistBase_1.default {
    initialize() {
        // check if the person table exists in the database
        return this.checkTableExistance('place', 'id TEXT PRIMARY KEY, lat INT, long INT, name TEXT, description TEXT');
    }
    getPlaces() {
        return this.retrieveList('SELECT * FROM place');
    }
    getPlace(id) {
        return this.retrieve(`SELECT * FROM place WHERE id = '${id}'`);
    }
    addPlace(place) {
        this.execute(`INSERT INTO place VALUES ('${place.id}', ${place.lat}, ${place.long}, '${place.name}', '${place.description}')`);
    }
    updatePlace(place) {
        this.execute(`UPDATE place SET name='${place.name}', description='${place.description}', lat=${place.lat}, long=${place.long} WHERE id = '${place.id}'`);
    }
    deletePlace(id) {
        this.execute(`DELETE FROM place WHERE id='${id}'`);
    }
}
exports.default = PlacePersist;
