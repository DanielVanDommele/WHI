import { UUID } from "crypto";
import Place from "../entity/place";
import PersistBase from "./PersistBase";

export default class PlacePersist  extends PersistBase {
    initialize(): Promise<boolean> {
        // check if the person table exists in the database
        return this.checkTableExistance('place', 'id TEXT PRIMARY KEY, lat INT, long INT, name TEXT, description TEXT');
    }

    getPlaces() : Promise <Place[]> {
        return this.retrieveList('SELECT * FROM place');
    }

    getPlace(id: UUID) : Promise<Place> {
        return this.retrieve(`SELECT * FROM place WHERE id = '${id}'`);
    }

    addPlace(place: Place) {
        this.execute(`INSERT INTO place VALUES ('${place.id}', ${place.lat}, ${place.long}, '${place.name}', '${place.description}')`);
    }

    updatePlace(place: Place) {
        this.execute(`UPDATE place SET name='${place.name}', description='${place.description}', lat=${place.lat}, long=${place.long} WHERE id = '${place.id}'`);
    }

    deletePlace(id: UUID) {
        this.execute(`DELETE FROM place WHERE id='${id}'`);
    }

    deleteAll() {
        this.execute('DELETE FROM place');
    }
}