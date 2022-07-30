import { Department } from "./department";
import { Job } from "./job";
import { Role } from "./role";

export interface User{
    userId:number;
    username:string;
    firstname:string;
    lastname:string;
    gender:string;
    dateOfBirth:any;
    phone:string;
    civilStatus:string;
    address:string;
    job:Job;
    email:string;
    joinedUs:Date;
    timeOffDayRemains:number;
    department:Department;
    role:Role;
    companyId:any;
    facebook:string;
    linkedin:string;
    discord:string;
    slack:string;
  image:string;

}

export interface UserDto{
    firstname:string;
    lastname:string;
    email:string;
    role:string;
    jobId:number;
    departmentId:number;
    companyId:any;
    username:string;
    doPresence:boolean;

}