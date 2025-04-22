"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _PersistBase_db;
Object.defineProperty(exports, "__esModule", { value: true });
class PersistBase {
    constructor(db) {
        _PersistBase_db.set(this, void 0);
        __classPrivateFieldSet(this, _PersistBase_db, db, "f");
    }
    getDb() {
        return __classPrivateFieldGet(this, _PersistBase_db, "f");
    }
    checkTableExistance(tableName, columns) {
        return new Promise((resolve, reject) => {
            __classPrivateFieldGet(this, _PersistBase_db, "f").get(`SELECT name FROM sqlite_master WHERE type='table' AND name='${tableName}'`, (err, row) => {
                if (err) {
                    console.error(`could not find out if table ${tableName} exists`, err);
                    reject(err);
                }
                if (!!row) {
                    resolve(true);
                }
                else {
                    try {
                        __classPrivateFieldGet(this, _PersistBase_db, "f").run(`CREATE TABLE ${tableName} (${columns})`);
                        resolve(false);
                    }
                    catch (e) {
                        console.error(`could not create table ${tableName}`, err);
                        reject(err);
                    }
                }
            });
        });
    }
    retrieve(selectQuery) {
        return new Promise((resolve, reject) => {
            __classPrivateFieldGet(this, _PersistBase_db, "f").get(selectQuery, (err, row) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(row);
                }
            });
        });
    }
    retrieveList(selectQuery) {
        return new Promise((resolve, reject) => {
            __classPrivateFieldGet(this, _PersistBase_db, "f").all(selectQuery, (err, rows) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(rows);
                }
            });
        });
    }
    execute(mutateQuery) {
        console.log('execute', mutateQuery);
        try {
            __classPrivateFieldGet(this, _PersistBase_db, "f").run(mutateQuery);
        }
        catch (e) {
            console.error('query execute error', e);
        }
    }
}
_PersistBase_db = new WeakMap();
exports.default = PersistBase;
