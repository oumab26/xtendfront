import { User } from "./user";

export interface Job{
    jobId:number;
    jobName:string;
    companyId:number;
    users:User[];
}