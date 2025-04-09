import PresencePersist from "../persistence/presencePersist";
import PresenceController from "../rest/presenceController";

export default class PresenceManager {
    #persist: PresencePersist;
    #controller: PresenceController;

    constructor(app: any, db: any, userSessions: any) {
        this.#persist = new PresencePersist(db);
        this.#controller = new PresenceController(app, userSessions, this.#persist);
    }

    activate() {
        Promise.all(this.#persist.initialize())
               .then(() => this.#controller.setup());
    }
}