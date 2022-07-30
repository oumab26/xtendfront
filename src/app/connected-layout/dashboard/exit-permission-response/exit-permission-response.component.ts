import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ExitPermission } from 'src/app/shared/models/exitPermission';
import { ExitpermissionserviceService } from 'src/app/shared/services/exitpermissionservice.service';

@Component({
  selector: 'app-exit-permission-response',
  templateUrl: './exit-permission-response.component.html',
  styleUrls: ['./exit-permission-response.component.css']
})
export class ExitPermissionResponseComponent implements OnInit {

  public exitPermissionPendingDemands: ExitPermission[];

  constructor(private toaster :ToastrService,
              private exitPermissionService:ExitpermissionserviceService) { }

  ngOnInit(): void {
    this.getPendingDemandExitPermission();
  }

  getPendingDemandExitPermission(){
    this.exitPermissionService.getPendingPermissionDemand().subscribe((Response:ExitPermission[])=>{
      this.exitPermissionPendingDemands=Response;
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

}
