import { User } from "./user";

export interface Department{
    departmentId:number;
    departmentName:string;
    companyId:number;
    users:User[];
}