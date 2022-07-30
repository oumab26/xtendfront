import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TimingserviceService {

  baseUrl = environment.backendEndpoint+"/api/timing";

  constructor(private http:HttpClient) { }


    public clockIn(userId:Number){
      return this.http.get(this.baseUrl+"/clockIn/"+userId);
    }

    public clockOut(userId:Number){
      return this.http.get(this.baseUrl+"/clockOut/"+userId)
    }

    public getTimingsByDateByUser(userId:Number,date:any){
      return this.http.get(this.baseUrl+"/getByDateByUser/"+userId+"/"+date)
    }

    public getTimingByUser(userId:Number){
      return this.http.get(this.baseUrl+"/getByUser/"+userId)
    }

    public getTodayTimings(){
      return this.http.get(this.baseUrl+"/getByToday")
    }

    public getWeeklyTimingByUser(userId:number){
      return this.http.get(this.baseUrl+"/getWeeklyByUser/"+userId)
    }

    public getTimingsByUserByMonth(userId:number,month){
      let params = new HttpParams();
      params = params.append('month', month);
      return this.http.post(this.baseUrl+"/getByUserByMonth/"+userId,params)
    }

    public getTodayPresence(){
      return this.http.get(this.baseUrl+"/getTodayPresence")
    }

    public getActivityReport(userId:number,month:number,year:number){
      return this.http.get(environment.backendEndpoint+"/api/activityReport/"+userId+"/"+month+"/"+year);
    }

    public getTodayPresencePercentage(companyId){
      return this.http.get(this.baseUrl+"/presencePercentage/"+companyId);
    }
}
