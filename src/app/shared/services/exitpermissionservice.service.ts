import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExitpermissionserviceService {

  baseUrl = environment.backendEndpoint+"/api/exitPermission";


  constructor(private http:HttpClient) { }

  public addExitPermissionDemand(exitPermissionDemand:any,userId:number){
    return this.http.post(this.baseUrl+"/addDemand/"+userId,exitPermissionDemand)
  }

  public acceptPermission(timeOffDemandId:Number){
    return this.http.get(this.baseUrl+"/acceptDemand/"+timeOffDemandId,{responseType : 'text' as 'json'})
  }

  public rejectPermission(timeOffDemandId:Number){
    return this.http.get(this.baseUrl+"/rejectDemand/"+timeOffDemandId,{responseType : 'text' as 'json'})
  }

  public getPendingPermissionDemand(){
    return this.http.get(this.baseUrl+"/getPendingDemand")
  }

  public getPermissionDemandByUser(userId:Number){
    return this.http.get(this.baseUrl+"/getByUser/"+userId)
  }

  public getPendingDemandByUser(userId:Number){
    return this.http.get(this.baseUrl+"/getPendingDemandByUser/"+userId)
  }

}
