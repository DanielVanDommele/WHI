import { UUID } from "crypto";

import User from "../entity/user";
import PersistBase from "./PersistBase";

export default class UserPersist extends PersistBase {
    initialize(): Promise<boolean> {
        return this.checkTableExistance('user', 'id TEXT PRIMARY KEY, personId TEXT, active INT, email TEXT, password TEXT, lastLogin INT');
    }

    async getUsers(): Promise<User[]> {
        return await this.retrieveList('SELECT * FROM user');
    }

    async getUser(id: UUID): Promise<User> {
        return await this.retrieve(`SELECT * FROM user WHERE id = '${id}'`);
    }

    async getUserByEmail(emailAdress: string): Promise<User> {
        return await this.retrieve(`SELECT * FROM user WHERE email = '${emailAdress}'`);
    }

    addUser(user: User) {
        this.execute(`INSERT INTO user VALUES ('${user.id}', '${user.personId}', ${user.active}, '${user.email}', '${user.password}', 0)`);
    }

    updateUserField(userId: UUID, fieldName: string, fieldValue: any) {
        this.execute(`UPDATE user SET ${fieldName} = '${fieldValue}' WHERE id = '${userId}'`);
    }

    deleteUser(userId: UUID) {
        this.execute(`DELETE FROM user WHERE id = '${userId}'`);
    }

    deleteAll() {
        this.execute('DELETE FROM user');
    }
}