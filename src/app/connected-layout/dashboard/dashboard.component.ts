import { Component, OnInit ,OnChanges} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-Jwt';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/shared/models/user';
import { PurchaseserviceserviceService } from 'src/app/shared/services/purchaseserviceservice.service';
import { TimingserviceService } from 'src/app/shared/services/timingservice.service';
import { UserserviceService } from 'src/app/shared/services/userservice.service';
import {StoreService} from '../../shared/services/store.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  myDate= Date.now();
  private daysArray= ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  public date= new Date();
  public hour:any;
  public minute:string;
  public second:string;
  public day:string;
  public attendancePercentage;
  public totalPurchasesAmount;
  public periodicExpensesYearly;
  public attendancePercentageOffice:string='70';
  public attendancePercentageHome:string='30';
  public msgAttendance:string="Des employés sont présents";
  public basicInformation:boolean=true;
  public socialMediaInformation:boolean;
  public userFirstLast:string;
  public user: User;
  public userRole:string;
  public todayPresenceList:any;
  permission: number;

  constructor(private userService:UserserviceService,
              private timingService:TimingserviceService,
              private storeService:StoreService,
              private purchaseService:PurchaseserviceserviceService,
              private activatedRoute:ActivatedRoute,
              private router:Router,
              private toaster :ToastrService) { }

  ngOnInit(): void {
    this.permission=parseInt(localStorage.getItem("permission")) ;
    this.decodeToken();
    this.getdatetime();
    this.getTodayPresenceList();
    this.getPresencePercentage();
    this.getExpensesStatistics();

  }




  private updateDate(date: Date){
    const hours= date.getHours();

    this.hour= hours % 23;
    this.hour= this.hour ? this.hour : 12;
    this.hour= this.hour < 10 ? '0' + this.hour : this.hour;

    const minutes= date.getMinutes();
    this.minute = minutes  < 10 ? '0' + minutes : minutes.toString();

    const seconds = date.getSeconds();
    this.second= seconds < 10 ? '0' +seconds : seconds.toString();

  }

  getdatetime(){
    setInterval(() => {
      const date= new Date();
      this.updateDate(date);
    },1000);
    this.day=this.daysArray[this.date.getDay()];
  }

  redirectTo(){
    switch(this.activatedRoute.snapshot.children[0].routeConfig.path){
      case 'time-off-response':{
        this.router.navigate(['leave/leave-response']);
        break;
      }
      case 'exit-permission-response':{
        this.router.navigate(['leave/leave-response']);
        break;
      }
      case 'purchase-response':{
        this.router.navigate(['expenses/purchases-demand']);
        break;
      }
    }
  }

  decodeToken(){
    if (this.storeService.userData){
      this.storeService.user.subscribe(resp=>{
        this.user=resp
        this.userFirstLast=this.user.firstname+" "+this.user.lastname;
        this.userRole=this.user.role.roleName;
      });
    }else{
      const token = localStorage.getItem('token');
      const decodedJwtJsonData = window.atob(token.split('.')[1]);
      const decodedJwtData = JSON.parse(decodedJwtJsonData) ;
      let username=decodedJwtData.sub;
      this.userService.getUserByUsername(username).subscribe((Response:User)=>{
        console.log("call from dashboard");
        this.user=Response;
        this.userFirstLast=this.user.firstname+" "+this.user.lastname;
        this.userRole=this.user.role.roleName;
      });
    }
  }

  getTodayPresenceList(){
    this.timingService.getTodayPresence().subscribe((Response)=>{
      this.todayPresenceList=Response;
    })
  }

  getPresencePercentage(){
    let companyId=parseInt(localStorage.getItem("company"));
    this.timingService.getTodayPresencePercentage(companyId).subscribe((Response:any)=>{
      this.attendancePercentage=Response['presencePercentage']*100;
    })
  }

  getExpensesStatistics(){
    this.purchaseService.getExpensesStatistics().subscribe((Response:any)=>{
      this.totalPurchasesAmount=Response.purchaseStat;
      this.periodicExpensesYearly=Response.periodicExpensesStat;
    })
  }

  }


