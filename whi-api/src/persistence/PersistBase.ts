export default class PersistBase {
    #db: any;

    constructor(db: any) {
        this.#db = db;
    }

    getDb(): any {
        return this.#db;
    }

    checkTableExistance(tableName: string, columns: string): Promise<boolean> {
        return new Promise((resolve: any, reject: any) => {
            this.#db.get(`SELECT name FROM sqlite_master WHERE type='table' AND name='${tableName}'`, (err: any, row: any) => {
                if (err) {
                    console.error(`could not find out if table ${tableName} exists`, err);
                    reject(err);
                }
                if (!!row) {
                    resolve(true);
                } else {
                    try {
                        this.#db.run(`CREATE TABLE ${tableName} (${columns})`);
                        resolve(false);
                    } catch (e) {
                        console.error(`could not create table ${tableName}`, err);
                        reject(err);
                    }
                }
            });
        });
    }

    retrieve(selectQuery: string): Promise<any> {
        return new Promise((resolve: any, reject: any) => {
            this.#db.get(selectQuery, (err: any, row: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    retrieveList(selectQuery: string): Promise<any> {
        return new Promise((resolve: any, reject: any) => {
            this.#db.all(selectQuery, (err: any, rows: any[]) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    execute(mutateQuery: string) {
        console.log('execute', mutateQuery); 
        try {
            this.#db.run(mutateQuery);    
        } catch (e) {
            console.error('query execute error', e);
        }
        
    }
}