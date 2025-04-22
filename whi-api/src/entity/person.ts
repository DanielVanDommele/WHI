import { UUID } from "crypto";

export enum Gender {
    Unknown,
    Male,
    Female
}

export enum RelationType {
    Self,
    Father,
    Mother,
    Grandfather,
    GrandMother,
    Son,
    Daughter,
    Nephew,
    Niece,
    Uncle,
    Aunt,
    GrandSon,
    GrandDaughter,
    Cousin,
    Husband,
    Wife,
    Partner,
    InLaw,
    Friend,
    Acquaintance,
    Stranger,
    Unknown
}

export interface Person {
    id: UUID,
    name: string,
    gender: Gender,
    birthDate: number,
    birthPlace: UUID | null
    description: string,
    relationType: RelationType,
    avatar: Blob | null
}