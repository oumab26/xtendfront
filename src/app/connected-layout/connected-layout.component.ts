import { Component, OnInit ,Input} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-Jwt';
import { UserserviceService } from '../shared/services/userservice.service';
import { User, UserDto } from '../shared/models/user';
import {StoreService} from '../shared/services/store.service';
import { Job } from '../shared/models/job';
import { Department } from '../shared/models/department';
import { CompanyserviceService } from '../shared/services/companyservice.service';
import { RoleserviceService } from '../shared/services/roleservice.service';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-connected-layout',
  templateUrl: './connected-layout.component.html',
  styleUrls: ['./connected-layout.component.css']
})
export class ConnectedLayoutComponent implements OnInit {
  public user: User;
  public usernameSearch: string;
  permission: number;
  pageTitle: string;
  public username: string;
  public isLarge: boolean=false;


  private data:any;

  displayStyle: string;



  constructor(public translate: TranslateService,
              public title: Title,
              public router: Router,
              public storeService:StoreService,
              public userService: UserserviceService,public companyservice:CompanyserviceService,
              public roleservice: RoleserviceService,) {}

  ngOnInit(): void {
    this.permission=parseInt(localStorage.getItem("permission")) ;
    this.getJwtTokens();
    this.translate.addLangs(['en', 'fr']);
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');

    this.displayStyle = "none";

    //add
    this.reloadData();

    this.getDepartments();


    this.getJobs();
    this.getRoles();
    this.getPermission();
  }


//add
  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }


  public User:any;
  
  
    public searchFilter: any = '';
    filterTerm: string;

    reloadData() : void {
      this.userService.getUserList().subscribe(
        (response) => {
          this.User = response;
          console.log(response);
        }
      );
  
  
  
    }

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


public depId:any;
public isPermitted:boolean=false;
public department:Department;
public jobs:Job[];

public departments:Department[];
public roles:any;
public showModal: boolean= false;
public showDeleteModal: boolean= false;
public deletedId:number;

  currentUser: User;
  userDepartment: Department;
  
    //add end


  getJwtTokens(){
    if (this.storeService.userData){
      this.storeService.user.subscribe(resp=>this.user=resp);
    }else{
      const token = localStorage.getItem('token');
      const decodedJwtJsonData = window.atob(token.split('.')[1]);
      const decodedJwtData = JSON.parse(decodedJwtJsonData) ;
      this.username = decodedJwtData.sub;
      this.userService.getUserByUsername(this.username).subscribe((Response:User)=>{
        console.log("call from connected Layout");
        this.user = Response;
        this.storeService.user.next(this.user);
        this.storeService.userData=true;
      });
    }
  }

  setTheTitle(): void {
    this.title.setTitle(this.pageTitle);
  }

  logout(){
    this.router.navigate(['login']);
    this.storeService.reset();
    localStorage.clear();
  }

  gotoprofile(){
    this.router.navigate(['profile'])
  }

  largeMode(){
    this.isLarge=true;
  }

  normalMode(){
    this.isLarge=false;
  }


  searchUser(){
    let username=this.usernameSearch ;
    this.router.navigate(['search-user', username]);
  }


}
