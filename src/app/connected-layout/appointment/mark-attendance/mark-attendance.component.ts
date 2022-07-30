import { Component, OnInit } from '@angular/core';
import { Absence } from 'src/app/shared/models/absence';
import { User } from 'src/app/shared/models/user';
import { TimingserviceService } from 'src/app/shared/services/timingservice.service';
import { UserserviceService } from 'src/app/shared/services/userservice.service';
import {StoreService} from '../../../shared/services/store.service';


@Component({
  selector: 'app-mark-attendance',
  templateUrl: './mark-attendance.component.html',
  styleUrls: ['./mark-attendance.component.css']
})
export class MarkAttendanceComponent implements OnInit {
  myDate= Date.now();


  private daysArray= ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  public date= new Date();
  public hour:any;
  public minute:string;
  public second:string;
  public day:string;
  public user: User;
  public todayTiming: any=null;


  constructor(public userService : UserserviceService,
              private timingservice :TimingserviceService,
              private storeService : StoreService) { }
  myWeeklyTimings :any;
  allAbsences: Absence[]=[];


  ngOnInit(): void {
    this.decodeToken();

    setInterval(() => {
      const date= new Date();
      this.updateDate(date);
    },1000);

      this.day=this.daysArray[this.date.getDay()];



  }


  decodeToken(){
    if (this.storeService.userData){
      this.storeService.user.subscribe(resp=>this.user=resp);
      this.getUserWeeklyTiming(this.user.userId)
    }else{
      const token = localStorage.getItem('token');
      const decodedJwtJsonData = window.atob(token.split('.')[1]);
      const decodedJwtData = JSON.parse(decodedJwtJsonData) ;
      let username=decodedJwtData.sub;
      this.userService.getUserByUsername(username).subscribe((Response:User)=>{
        this.user=Response;
        this.storeService.user.next(this.user);
        this.storeService.userData=true;
        console.log("call from mark attendance");
        this.getUserWeeklyTiming(this.user.userId)
      });
    }
  }

  getUserWeeklyTiming(userId:number){
    this.timingservice.getWeeklyTimingByUser(userId).subscribe((Response)=>{
      this.myWeeklyTimings=Response;
    })
  }

  clockIn(){
    this.timingservice.clockIn(this.user.userId).subscribe((Response:any)=>{
      this.todayTiming=Response;
      this.getUserWeeklyTiming(Response.user.userId);
    })
  }

  clockOut(){
    this.timingservice.clockOut(this.user.userId).subscribe((Response:any)=>{
      this.todayTiming=Response;
      this.getUserWeeklyTiming(Response.user.userId);
    })
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


}

