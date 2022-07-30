import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  baseUrl = environment.backendEndpoint+"/api/user";

  constructor(private http:HttpClient) { }

 public getUserList() {
    return this.http.get(this.baseUrl+"/users");


  }


 

  public addUser(userDto:any){
    return this.http.post(this.baseUrl+"/add",userDto);
  }

  public getUsers(){
    return this.http.get(this.baseUrl+"/get");
  }

  public getOne(userId:Number){
    return this.http.get(this.baseUrl+"/getOne/"+userId);
  }

  public deleteUser(userId:Number){
    return this.http.delete(this.baseUrl+"/delete/"+userId);
  }

  public changePassword(pwdDto:any,userId:Number){
    return this.http.put(this.baseUrl+"/changePassword/"+userId,pwdDto,{responseType : 'text' as 'json'});
  }
  public getUserByUsername(username:String){
    return this.http.get(this.baseUrl+"/getByUsername/"+username);
  }

  public editUser(userId:Number,key:string,val:string){
    let params = new HttpParams();
    params = params.append('value', val);
    return this.http.post(this.baseUrl+"/edit/"+userId+"/"+key,params)
  }
  /** 
  public editImage(userId:Number,val:string){
    let params = new HttpParams();
    params = params.append('value', val);
    return this.http.post(this.baseUrl+"/editimage/"+userId+"/",params)
  }
**/
 
/** 
  public editImage(userId:Number,val:string){
    let params = new HttpParams();
    params = params.append('username', val);
    return this.http.post(this.baseUrl+"/editimage/"+userId,params,{responseType : 'text' as 'json'});
  }**/


  public editImage(userId:Number,key:string,val:string){
    let params = new HttpParams();
    params = params.append('value', val);
    return this.http.post(this.baseUrl+"/editimage/"+userId+"/"+key,params)
  }

  public editUsername(userId:Number,val:string){
    let params = new HttpParams();
    params = params.append('username', val);
    return this.http.post(this.baseUrl+"/editUsername/"+userId,params,{responseType : 'text' as 'json'});
  }
  
  public changeRole(userId:number, val:string){
    let params = new HttpParams();
    params = params.append('roleName',val);
    return this.http.post(this.baseUrl+"/changeRole/"+userId,params,{responseType : 'text' as 'json'})
  }


}
