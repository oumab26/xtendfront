import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleserviceService {

  baseUrl = environment.backendEndpoint+"/api/role";

  constructor(private http:HttpClient) { }

  public getRoles(){
    return this.http.get(this.baseUrl+"/getAll");
  }
}
