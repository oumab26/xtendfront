import { User } from "./user";

export interface TimeOff{
     id:number;
     numberOfDays:number;
     startDate:Date;
     user:User;
     type:string;
     reason:string;
     status:any;
}
