import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../models/user';
import {Company} from '../models/company';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  public userData:boolean=false;

  public company = new BehaviorSubject(null);
  public user = new BehaviorSubject(null);


  constructor() { }

  reset(){
    this.userData=false;
    this.user.next(null);
    this.company.next(null);
  }
}
