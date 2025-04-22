"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PersistBase_1 = __importDefault(require("./PersistBase"));
class UserPersist extends PersistBase_1.default {
    initialize() {
        return this.checkTableExistance('user', 'id TEXT PRIMARY KEY, personId TEXT, active INT, email TEXT, password TEXT, lastLogin INT');
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.retrieveList('SELECT * FROM user');
        });
    }
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.retrieve(`SELECT * FROM user WHERE id = '${id}'`);
        });
    }
    getUserByEmail(emailAdress) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.retrieve(`SELECT * FROM user WHERE email = '${emailAdress}'`);
        });
    }
    addUser(user) {
        this.execute(`INSERT INTO user VALUES ('${user.id}', '${user.personId}', ${user.active}, '${user.email}', '${user.password}', 0)`);
    }
    updateUserField(userId, fieldName, fieldValue) {
        this.execute(`UPDATE user SET ${fieldName} = '${fieldValue}' WHERE id = '${userId}'`);
    }
    deleteUser(userId) {
        this.execute(`DELETE FROM user WHERE id = '${userId}'`);
    }
    deleteAll() {
        this.execute('DELETE FROM user');
    }
}
exports.default = UserPersist;
