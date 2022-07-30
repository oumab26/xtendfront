import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AbsenceserviceService {
  baseUrl = environment.backendEndpoint+"/api/absence";

  constructor(private http:HttpClient) { }

  public getAllAbsence(){
    return this.http.get(this.baseUrl+"/getAll");
  }
  
  public getUserAbsences(userId){
    return this.http.get(this.baseUrl+"/getByUser/"+userId);
  }

  public deleteAbsence(userId){
    return this.http.delete(this.baseUrl+"/delete/"+userId)
  }

}
