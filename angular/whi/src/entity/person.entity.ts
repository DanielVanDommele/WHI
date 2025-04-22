import { Gender } from "../app/enums/gender.enum";
import { RelationType } from "../app/enums/relationType.enum";

export interface Person {
    id: string,
    name: string,
    gender: Gender,
    birthDate: number,
    birthPlace: string | null,
    description: string,
    relationType: RelationType,
    avatar: string | null
}