import { User } from "./user";

export interface Timing{
    id:number;
    clockIn:Date;
    clockOut:Date;
    date:Date;
    user:User;
}