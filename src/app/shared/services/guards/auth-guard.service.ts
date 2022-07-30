import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor( public router: Router) { }

  canActivate(): boolean {
    if (localStorage.getItem("token")) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService2 implements CanActivateChild {

  constructor( public router: Router) { }

  canActivateChild(): boolean {
    if (localStorage.getItem("token")) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}