import { User } from "./user";

export interface ExitPermission{
      id:number;
      exitTime:Date;
      returnTime:Date;
      reason:string;
      date:Date;
      status:string;
      user:User;
}
