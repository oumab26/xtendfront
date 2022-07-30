import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User, UserDto } from 'src/app/shared/models/user';
import { UserserviceService } from 'src/app/shared/services/userservice.service';
import { CompanyserviceService } from 'src/app/shared/services/companyservice.service';
import { RoleserviceService } from 'src/app/shared/services/roleservice.service';
import { ToastrService } from 'ngx-toastr';
import { JwtHelperService } from '@auth0/angular-Jwt';
import { HttpClient } from "@angular/common/http"
import { Job } from 'src/app/shared/models/job';
import { Department } from 'src/app/shared/models/department';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
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
public ajouterEmployeForm : FormGroup;
  currentUser: User;
  userDepartment: Department;


  constructor(public companyservice:CompanyserviceService,
              public roleservice: RoleserviceService,
              private userService:UserserviceService,
              public formBuilder:FormBuilder,
              private toaster :ToastrService,
              private userservice :UserserviceService,
              private router:Router,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.getDepartments();


    this.getJobs();
    this.getRoles();
    this.getPermission();

    this.ajouterEmployeForm=this.formBuilder.group({
      firstname:['',Validators.required],
      lastname:['',Validators.required],
      email:['',Validators.required],
      jobId:['',Validators.required],
      department:['',Validators.required],
      role:['',Validators.required],
      doPresence:['',Validators.required]
      
    })


  }



  addUser(){
    if(this.ajouterEmployeForm.valid){
      this.user=this.ajouterEmployeForm.value;

      if (this.ajouterEmployeForm.controls['department'].enabled){
        this.depId=this.ajouterEmployeForm.value.department;
        this.depId=parseInt(this.ajouterEmployeForm.value.department);
      }else{
        this.depId=this.department.departmentId;
      }
      this.user.companyId=localStorage.getItem("company");
      this.user.departmentId=this.depId;
      this.userservice.addUser(this.user).subscribe((Response:any)=>{
        this.toaster.success("Employé ajouté avec succés");
        this.hideAboutModal();
        this.getDepartments();
      },(error:any)=>{
      })
      }
    else{
        this.toaster.warning("veuillez vérifier les champs");
      }
    }


getDepartments(){
  this.companyservice.getDepartments(localStorage.getItem("company")).subscribe((response:Department[])=>{
    this.departments=response;
    this.decodeToken();
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

showModalAjouterEmploye(){
  this.showModal=true;
  this.ajouterEmployeForm.controls['department'].enable();
}
showModalSupprimerEmploye(userId){
  this.showDeleteModal=true;
  this.deletedId=userId;
}
hidedeletModal(){
  this.showDeleteModal=false;
}
hideAboutModal(){
  this.showModal=false;
  this.clearform(this.ajouterEmployeForm);
}

showModalByDepartment(department:any){
  this.ajouterEmployeForm.controls['department'].setValue(department.departmentId);
  this.ajouterEmployeForm.controls['department'].disable();
  this.department=department;
  this.showModal=true;
}

clearform(form:FormGroup){
form.reset();
}

deleteUser(){
  this.userservice.deleteUser(this.deletedId).subscribe((Response:any)=>{
    this.getDepartments();
    this.hidedeletModal();
  },(error:any)=>{
  });
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

decodeToken(){
  let token=localStorage.getItem("token");
  const helper=new JwtHelperService();
  let decodedToken=helper.decodeToken(token);
  let username=decodedToken.sub;
  this.userService.getUserByUsername(username).subscribe((Response:User)=>{
    this.departments.forEach(department => {
      department.users.forEach(user=>{
        if(user.userId===Response.userId){
          this.userDepartment=department;
        }
      })
    });
  });
}



}

