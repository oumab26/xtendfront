import { Department } from "./department";
import { Job } from "./job";
import {  UserDto } from "./user";

export interface Company{
      companyId:number;
      companyEmail:string;
      companyName:string;
      companyActivity:string;
      phone:string;
      personalSize:string;
      address:string;
      postalCode:string;
      worktimetable:string;
      dayOff:string;
      numberOfDaysTimeOff:number;
      users:UserDto[];
      departments:Department[];
      jobs:Job[];
}
