import { Component, OnInit } from '@angular/core';
import { UserserviceService } from 'src/app/shared/services/userservice.service';
import { User } from 'src/app/shared/models/user';
import {StoreService} from '../../shared/services/store.service';


@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  user:User;
  permission: number;

  constructor(public userService:UserserviceService,private storeService:StoreService) { }

  ngOnInit(): void {
    this.permission=parseInt(localStorage.getItem("permission")) ;
    this.decodeToken();
  }


  decodeToken(){
    if (this.storeService.userData){
      this.storeService.user.subscribe(resp=>this.user=resp);
    }else{
      const token = localStorage.getItem('token');
      const decodedJwtJsonData = window.atob(token.split('.')[1]);
      const decodedJwtData = JSON.parse(decodedJwtJsonData) ;
      let username=decodedJwtData.sub;
      this.userService.getUserByUsername(username).subscribe((Response:User)=>{
        this.user=Response;
        this.storeService.user.next(this.user);
        this.storeService.userData=true;
        console.log("call from appointment");
      });
    }
  }

}

