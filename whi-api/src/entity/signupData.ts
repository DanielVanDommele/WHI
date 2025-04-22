import { Person } from "./person";
import User from "./user";

export default interface SignupData {
    person: Person,
    user: User,
    url: string
};