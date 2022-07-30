import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthenticationModel } from '../models/authenticationModel';
import { ResetPasswordModel } from '../models/resetPasswordModel';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {
  baseUrl = environment.backendEndpoint+"/api/login";

  constructor(private http:HttpClient) { }
  

  public generateToken(authModel:AuthenticationModel){
    return this.http.post(this.baseUrl,authModel);
  }
  // public getAuthenticatedRole(username:string){
  //   return this.http.get(this.baseUrl+"/getAuthenticatedRole/"+username);
  // }
  public generateCode(resetPasswordModel:ResetPasswordModel){
    return this.http.post(this.baseUrl+"/codeReset",resetPasswordModel,{responseType : 'text' as 'json'});
  }
  public resetPassword(resetPasswordModel:ResetPasswordModel){
    return this.http.post(this.baseUrl+"/resetPassword",resetPasswordModel);
  }
}
