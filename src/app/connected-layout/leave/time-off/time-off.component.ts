import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TimeOff } from 'src/app/shared/models/timeOff';
import { User } from 'src/app/shared/models/user';
import { TimeoffserviceService } from 'src/app/shared/services/timeoffservice.service';
import { JwtHelperService } from '@auth0/angular-Jwt';
import { UserserviceService } from 'src/app/shared/services/userservice.service';


@Component({
  selector: 'app-time-off',
  templateUrl: './time-off.component.html',
  styleUrls: ['./time-off.component.css']
})
export class TimeOffComponent implements OnInit {

  public TimeOffDemandForm:FormGroup;
  public showModal:boolean=false;
  public userTimeOff:TimeOff[];
  public userPendingDemands:TimeOff[];

  @Input() user:User;
  private userId: number;

  constructor(public formBuilder:FormBuilder,
              private userService:UserserviceService,
              private toaster :ToastrService,
              private timeOffService:TimeoffserviceService) { }

  ngOnInit(): void {
    this.decodeToken();
    this.TimeOffDemandForm=this.formBuilder.group({
      startDate:['',Validators.required],
      numberOfDays:['',Validators.required],
      type:['',Validators.required],
      reason:[''],

    })
  }



  decodeToken(){
    const token = localStorage.getItem('token');
    const decodedJwtJsonData = window.atob(token.split('.')[1]);
    const decodedJwtData = JSON.parse(decodedJwtJsonData) ;
    let username=decodedJwtData.sub;
    this.userService.getUserByUsername(username).subscribe((Response:User)=>{
      this.user=Response;
      this.getPendingDemands(this.user.userId);
      this.getUserDemands(this.user.userId);
    });
  }

  addTimeOffDemand(){
    let timeOff:TimeOff;
    timeOff=this.TimeOffDemandForm.value;
    if(this.TimeOffDemandForm.valid){
      this.timeOffService.addTimeOffDemand(timeOff,this.user.userId).subscribe((Response:any)=>{
        this.toaster.success("la demande de congé est enregistrée");
        this.hideModal();
        this.getPendingDemands(this.user.userId);
      },(error:any)=>{
        this.toaster.warning("Oups")
      })
    }
  }

  hideModal(){
    this.showModal=false;
  }

  addDemand(){
    this.showModal=true;
  }

  getUserDemands(userId){
    this.timeOffService.getTimeOffByUser(userId).subscribe((Response:any)=>{
      this.userTimeOff=Response;
    })
  }

  getPendingDemands(userId){
    this.timeOffService.getPendingDemandByUser(userId).subscribe((Response:any)=>{
      this.userPendingDemands=Response;
    })
  }
}
