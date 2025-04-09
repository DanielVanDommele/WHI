import { UUID } from "crypto"
import { Person } from "./person"

export enum Context {
    Work,
    Business,
    School,
    University,
    Holiday,
    DayOut,
    Appointment,
    Dating,
    Marriage,
    Burial,
    Hospitalization,
    BirthPlace,
    Home,
    FormerHome,
    ChurchAttending,
    MoskAttending,
    TempleVisiting,
    Concert,
    SportGame,
    Other,
    Unknown
}

export interface Presence {
    id: UUID,
    place: UUID,            // where
    from: number,           // when
    to: number,             // when
    company: Person[],        // who
    context: Context,       // what
    reason: string          // why
}