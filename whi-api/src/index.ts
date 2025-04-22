import express from "express"
import bodyParser from "body-parser"
import cors from "cors"

import { Person } from "./entity/person";
import PersonManager from "./manager/personManager";
import PlaceManager from "./manager/placeManager";
import PresenceManager from "./manager/presenceManager";
import UserManager from "./manager/userManager";

const userSessions: any = {
    "AFDA80D5-1A5A-SA5A-8A5A-D3BAD15AB07A": "AFDA80D5-1A5A-SA5A-8A5A-D3BAD15AB07A"
};

const app = express();
app.use(cors());
app.use(bodyParser.json());

const sqlite3 = require('sqlite3').verbose();
const db: any = new sqlite3.Database('data/whi');

const personManager = new PersonManager(app, db, userSessions);
const placeManager = new PlaceManager(app, db, userSessions);
const presenceManager = new PresenceManager(app, db, userSessions);
const userManager = new UserManager(app, db, userSessions);

db.serialize(() => {
    personManager.activate();
    placeManager.activate();
    presenceManager.activate();
    userManager.activate();
});

app.listen(3033, () => { 
    console.log("WHI API started on port 3033");
});