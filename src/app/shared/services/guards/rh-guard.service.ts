import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RhGuardService implements CanActivate{

  permission: number;
  constructor( public router: Router) { }
  canActivate(): boolean {
    this.permission=parseInt(localStorage.getItem("permission")) ;
    if(this.permission>=4) {
      return true;
    }else{
      this.router.navigate(['dashboard']);
      return false;
    }
  }
}
