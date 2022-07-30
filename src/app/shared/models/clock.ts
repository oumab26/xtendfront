import { User } from "./user";

export interface Clock{
    id:number;
    time:Date;
    date:Date;
    state:String;
    user:User;
}