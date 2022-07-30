import { Component, OnInit } from '@angular/core';
import { User, UserDto } from 'src/app/shared/models/user';
import { Router } from '@angular/router';
import { UserserviceService } from 'src/app/shared/services/userservice.service';
import { RoleserviceService } from 'src/app/shared/services/roleservice.service';
import { CompanyserviceService } from 'src/app/shared/services/companyservice.service';
import { Department } from 'src/app/shared/models/department';
import { Job } from 'src/app/shared/models/job';
import { FormGroup } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
//pagination
  
  p: number = 1;
  total: number = 0;

  config: any;

  public user:UserDto;
public depId:any;
public isPermitted:boolean=false;
public department:Department;
public jobs:Job[];
public username:string;
public departments:Department[];
public roles:any;
public showModal: boolean= false;
public showDeleteModal: boolean= false;
public deletedId:number;

  currentUser: User;
  userDepartment: Department;

  

  private data:any;

public User:any;


  public searchFilter: any = '';
  filterTerm: string;
  constructor( private userService:UserserviceService,  private router: Router,public companyservice:CompanyserviceService,
    public roleservice: RoleserviceService,
   ) { }

   collection = { count: 60, data: [] };
  ngOnInit() {
    this.reloadData();

    this.getDepartments();


    this.getJobs();
    this.getRoles();
    this.getPermission();


  }

  reloadData() : void {
    this.userService.getUserList().subscribe(
      (response) => {
        this.User = response;
        console.log(response);
      }
    );



  }

/** 
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.collection.count
    };


  pageChanged(event){
    this.config.currentPage = event;
  }**/

  getDepartments(){
    this.companyservice.getDepartments(localStorage.getItem("company")).subscribe((response:Department[])=>{
      this.departments=response;
    
    })
  }
  
  
  
  getJobs(){
    this.companyservice.getJobs(localStorage.getItem("company")).subscribe((response:Job[])=>{
      this.jobs=response;
    })
  }
  
  getRoles(){
    this.roleservice.getRoles().subscribe((response)=>{
      this.roles=response;
    })
  }

 
  showModalSupprimerEmploye(userId){
    this.showDeleteModal=true;
    this.deletedId=userId;
  }
  hidedeletModal(){
    this.showDeleteModal=false;
  }

  
  clearform(form:FormGroup){
  form.reset();
  }

  
getPermission(){
  let permission= localStorage.getItem('permission')
  if(parseInt(permission)>=4){
    this.isPermitted=true;
  }
}

// getJobById(jobId:Number):Job{
//   let myJobs=this.jobs;
//   let constJob=myJobs.filter(x=>( x.jobId===jobId));
//   return constJob[0];

// }
getJobById(label: any): any {
  const categorylist = this.jobs;
  const category = categorylist.filter(cat => cat.jobId== label);
  return category[0];
}

viewProfile(userId){
this.router.navigate(['update-profile',userId]);
}

  

}
