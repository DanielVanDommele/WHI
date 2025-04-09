import PlacePersist from "../persistence/placePersist";
import PlaceController from "../rest/placeController";

export default class PlaceManager {
    #persist: PlacePersist;
    #controller: PlaceController;

    constructor(app: any, db: any, userSessions: any) {
        this.#persist = new PlacePersist(db);
        this.#controller = new PlaceController(app, userSessions, this.#persist);
    }

    activate() {
        this.#persist.initialize()
            .then(() => this.#controller.setup());
    }
}