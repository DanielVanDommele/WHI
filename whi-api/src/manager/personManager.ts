import PersonPersist from "../persistence/personPersist";
import PersonController from "../rest/personController";

export default class PersonManager {
    #persist: PersonPersist;
    #controller: PersonController;

    constructor(app: any, db: any, userSessions: any) {
        this.#persist = new PersonPersist(db);
        this.#controller = new PersonController(app, userSessions, this.#persist);
    }

    activate() {
        Promise.all(this.#persist.initialize())
               .then(() => this.#controller.setup());
    }
}