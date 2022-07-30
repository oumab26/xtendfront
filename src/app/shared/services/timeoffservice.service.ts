import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TimeoffserviceService {

  baseUrl = environment.backendEndpoint+"/api/timeOff";

  constructor(private http:HttpClient) { }


  
    public getGlobalTimeOff(companyId:number){
        return this.http.get(this.baseUrl+"/globalview/"+companyId);
    }

    public getTimeOffByUser(userId:Number){
        return this.http.get(this.baseUrl+"/getByUser/"+userId);
    }

    public addTimeOffDemand(timeOffDemand:any,userId:number){
      return this.http.post(this.baseUrl+"/addDemand/"+userId,timeOffDemand);
    }

    public acceptTimeOffDemand(timeOffDemandId:Number){
      return this.http.get(this.baseUrl+"/acceptDemand/"+timeOffDemandId,{responseType : 'text' as 'json'});
    }

    public rejectTimeOffDemand(timeOffDemandId:Number){
      return this.http.get(this.baseUrl+"/rejectDemand/"+timeOffDemandId,{responseType : 'text' as 'json'});
    }

    public cancelTimeOffDemand(timeOffDemandId:Number){
      return this.http.get(this.baseUrl+"/cancelDemand/"+timeOffDemandId,{responseType : 'text' as 'json'});
    }

    public getPendingDemand(){
      return this.http.get(this.baseUrl+"/getPendingDemand");
    }
    public getPendingDemandByUser(userId:number){
      return this.http.get(this.baseUrl+"/getPendingDemandByUser/"+userId);
    }

    
}
