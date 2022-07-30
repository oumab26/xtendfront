import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ExitPermission } from 'src/app/shared/models/exitPermission';
import { TimeOff } from 'src/app/shared/models/timeOff';
import { ExitpermissionserviceService } from 'src/app/shared/services/exitpermissionservice.service';
import { TimeoffserviceService } from 'src/app/shared/services/timeoffservice.service';

@Component({
  selector: 'app-leave-response',
  templateUrl: './leave-response.component.html',
  styleUrls: ['./leave-response.component.css']
})
export class LeaveResponseComponent implements OnInit {
  public timeOffPendingDemands: TimeOff[];
  public exitPermissionPendingDemands: ExitPermission[];

  constructor(private toaster :ToastrService,
              private timeOffService:TimeoffserviceService,
              private exitPermissionService:ExitpermissionserviceService) { }

  ngOnInit(): void {
    this.getPendingDemandExitPermission();
    this.getPendingDemandTimeOff();
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

  acceptExitPermissionDemand(exitPermissionDemandId:number){
    this.exitPermissionService.acceptPermission(exitPermissionDemandId).subscribe((Response:string)=>{
      if(Response==="SUCCESS"){
        this.toaster.success("La demande de sortie est acceptée");
        this.getPendingDemandExitPermission();
      }
    })
  }

  rejectExitPermissionDemand(exitPermissionDemandId:number){
    this.exitPermissionService.rejectPermission(exitPermissionDemandId).subscribe((Response:string)=>{
      if(Response==="SUCCESS"){
        this.toaster.success("La demande de sortie est rejetée");
        this.getPendingDemandExitPermission();
      }
    })
  }

  getPendingDemandTimeOff(){
    this.timeOffService.getPendingDemand().subscribe((Response:TimeOff[])=>{
      this.timeOffPendingDemands=Response;
    })
  }

  getPendingDemandExitPermission(){
    this.exitPermissionService.getPendingPermissionDemand().subscribe((Response:ExitPermission[])=>{
      this.exitPermissionPendingDemands=Response;
    })
  }
}
