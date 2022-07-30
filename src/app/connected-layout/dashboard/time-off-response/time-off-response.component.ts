import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TimeOff } from 'src/app/shared/models/timeOff';
import { TimeoffserviceService } from 'src/app/shared/services/timeoffservice.service';

@Component({
  selector: 'app-time-off-response',
  templateUrl: './time-off-response.component.html',
  styleUrls: ['./time-off-response.component.css']
})
export class TimeOffResponseComponent implements OnInit {

  public timeOffPendingDemands: TimeOff[];

  constructor(private toaster :ToastrService,
              private timeOffService:TimeoffserviceService) { }

  ngOnInit(): void {
    this.getPendingDemandTimeOff();
  }

  getPendingDemandTimeOff(){
    this.timeOffService.getPendingDemand().subscribe((Response:TimeOff[])=>{
      this.timeOffPendingDemands=Response;
    })
  }

  acceptTimeOffDemand(timeOffDemandId:number){
    this.timeOffService.acceptTimeOffDemand(timeOffDemandId).subscribe((Response:string)=>{
      if(Response==="SUCCESS"){
        this.toaster.success("La demande de congé est acceptée");
        this.getPendingDemandTimeOff();
      }
    })
  }

  rejectTimeOffDemand(timeOffDemandId:number){
    this.timeOffService.rejectTimeOffDemand(timeOffDemandId).subscribe((Response:string)=>{
      if(Response==="SUCCESS"){
        this.toaster.success("La demande de congé est rejeté");
        this.getPendingDemandTimeOff();
      }
    })
  }
}
