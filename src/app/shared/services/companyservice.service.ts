import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Company } from '../models/company'

@Injectable({
  providedIn: 'root'
})
export class CompanyserviceService {
  baseUrl = environment.backendEndpoint+"/api/company";

  constructor(private http:HttpClient) { }

  public addCompany(company:Company){
    return this.http.post(this.baseUrl+"/addCompany",company,{responseType : 'text' as 'json'});
  }

  public getCompany(id: Number) {
    return this.http.get(this.baseUrl+"/getCompany/"+id);
  }

  public getDepartments (id:any){
    return this.http.get(this.baseUrl+"/"+id+"/departments");
  }

  public getJobs (id:any){
    return this.http.get(this.baseUrl+"/"+id+"/jobs");
  }


  public addDepartments(companyId:Number,departmentName:string){
    let params = new HttpParams();
    params = params.append('departmentName', departmentName);
    return this.http.post(this.baseUrl+"/"+companyId+"/addDepartments",params)
  }

  public addJobs(companyId:Number,jobName:string){
    let params = new HttpParams();
    params = params.append('jobName', jobName);
    return this.http.post(this.baseUrl+"/"+companyId+"/addJobs",params)
  }

}
