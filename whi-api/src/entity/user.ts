import { UUID } from "crypto";

export default interface User {
    id: UUID,
    personId: UUID,
    active: boolean,
    email: string,
    password: string,
    lastLogin: number
}