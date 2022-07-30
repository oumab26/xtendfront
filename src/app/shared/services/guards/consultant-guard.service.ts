import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ConsultantGuardService {
  permission: number;

  constructor( public router: Router) { }

  canActivate(): boolean {
    this.permission=parseInt(localStorage.getItem("permission")) ;
    if(this.permission>=2) {
      return true;
    }else{
      this.router.navigate(['dashboard']);
      return false;
    }
  }
}
