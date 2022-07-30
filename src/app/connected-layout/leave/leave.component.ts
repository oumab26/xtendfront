import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-Jwt';
import { User } from 'src/app/shared/models/user';
import { UserserviceService } from 'src/app/shared/services/userservice.service';


@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent implements OnInit {

  public timeOff:boolean;
  public exitPermission:boolean;
  public user: User;
  permission: number;


  constructor(public router: Router) { }

  ngOnInit(): void {
    this.permission=parseInt(localStorage.getItem("permission")) ;
  }

}
