import { UUID } from "crypto";

export enum Gender {
    Male,
    Female,
    Unknown
}

export enum RelationType {
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
    Self,
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