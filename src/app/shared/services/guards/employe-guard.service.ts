import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EmployeGuardService {

  permission: number;

  constructor( public router: Router) { }

  canActivate(): boolean {
    this.permission=parseInt(localStorage.getItem("permission")) ;
    if(this.permission>=3) {
      return true;
    }else{
      this.router.navigate(['dashboard']);
      return false;
    }
  }
}
