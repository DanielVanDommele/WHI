import UserPersist from "../persistence/userPersist";
import UserController from "../rest/userController";

export default class UserManager {
    #persist: UserPersist;
    #controller: UserController;

    constructor(app: any, db: any, userSessions: any) {
        this.#persist = new UserPersist(db);
        this.#controller = new UserController(app, userSessions, this.#persist);
    }

    activate() {
        this.#persist.initialize()
            .then(() => this.#controller.setup());
    }
}