import { UUID } from "crypto";

export default interface Place {
    id: UUID,
    lat: number,
    long: number,
    name: string,
    description: string
}