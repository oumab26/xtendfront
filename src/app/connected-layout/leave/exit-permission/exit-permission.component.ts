import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ExitPermission } from 'src/app/shared/models/exitPermission';
import { User } from 'src/app/shared/models/user';
import { ExitpermissionserviceService } from 'src/app/shared/services/exitpermissionservice.service';
import { UserserviceService } from 'src/app/shared/services/userservice.service';

import { JwtHelperService } from '@auth0/angular-Jwt';
@Component({
  selector: 'app-exit-permission',
  templateUrl: './exit-permission.component.html',
  styleUrls: ['./exit-permission.component.css']
})
export class ExitPermissionComponent implements OnInit {

  public ExitDemandForm:FormGroup;
  public showModal:boolean=false;
  public userExitPermission: ExitPermission[];
  public userPendingDemands:ExitPermission[];

  @Input() user:User;
  private userId: number;

  constructor(public formBuilder:FormBuilder,
    private userService:UserserviceService,
    private toaster :ToastrService,
    private exitPermissionService:ExitpermissionserviceService) { }

  ngOnInit(): void {
    this.decodeToken();
    this.ExitDemandForm=this.formBuilder.group({
      exitTime:['',Validators.required],
      returnTime:['',Validators.required],
      date:['',Validators.required],
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

  addExitDemand(){
    let exitPermission:any;
    exitPermission=this.ExitDemandForm.value;
    if(this.ExitDemandForm.valid){
      this.exitPermissionService.addExitPermissionDemand(exitPermission,this.user.userId).subscribe((Response:any)=>{
        this.toaster.success("la demande de sortie est enregistrée");
        this.hideModal();
        this.getPendingDemands(this.user.userId);
      },(error:any)=>{
        this.toaster.warning("Oups")
      })
    }
  }
  addLeaveDemand(){
    this.showModal=true;
  }
  hideModal(){
    this.showModal=false;
  }

  getUserDemands(userId){
    this.exitPermissionService.getPermissionDemandByUser(userId).subscribe((Response:any)=>{
      this.userExitPermission=Response;
    })
  }
  getPendingDemands(userId){
    this.exitPermissionService.getPendingDemandByUser(userId).subscribe((Response:any)=>{
      this.userPendingDemands=Response;
    })
  }


}
