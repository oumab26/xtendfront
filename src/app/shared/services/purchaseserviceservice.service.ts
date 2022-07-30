import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PurchaseserviceserviceService {

  baseUrl = environment.backendEndpoint+"/api/purchase";

  constructor(private http:HttpClient) { }

  public getProviders(){
    return this.http.get(this.baseUrl+"/provider/getAll");
  }

  public getProviderById(providerId: Number){
    return this.http.get(this.baseUrl+"/provider/get/"+providerId);
  }

  public addProvider(provider:Provider){
    return this.http.post(this.baseUrl+"/provider/add",provider,{responseType : 'text' as 'json'});
  }

  public editProvider(provider:any,providerId:number){
    return this.http.put(this.baseUrl+"/provider/edit/"+providerId,provider);
  }

  public deleteProvider(providerID:number){
    return this.http.delete(this.baseUrl+"/provider/delete/"+providerID);
  }

  public acceptPurchaseDemand(purchaseDemandId:Number){
    return this.http.get(this.baseUrl+"/purchaseDemand/accept/"+purchaseDemandId);
  }

  public rejectPurchaseDemand(purchaseDemandId:Number){
    return this.http.get(this.baseUrl+"/purchaseDemand/reject/"+purchaseDemandId);
  }

  public cancelPurchaseDemand(purchaseDemandId:Number){
    return this.http.get(this.baseUrl+"/purchaseDemand/cancel/"+purchaseDemandId);
  }

  public addPurchaseDemand(purchaseDemand:any){
    return this.http.post(this.baseUrl+"/purchaseDemand/add",purchaseDemand,{responseType : 'text' as 'json'});
  }

  public getPendingPurchasesDemand(){
    return this.http.get(this.baseUrl+"/getPendingDemand");
  }

  public getHistoryPurchasesByUser(userId){
    return this.http.get(this.baseUrl+"/getHistoryDemandByUser/"+userId);
  }
  public getPendingPurchasesByUser(userId){
    return this.http.get(this.baseUrl+"/getPendingDemandByUser/"+userId);
  }

  public getProducts(){
    return this.http.get(this.baseUrl+"/product/getAll");
  }

  public getPeriodicExpenses(){
    return this.http.get(this.baseUrl+"/periodicExpenses/getAll");
  }

  public addPeriodicExpenses(periodicExpenses:any,companyId){
    return this.http.post(this.baseUrl+"/periodicExpenses/add/"+companyId,periodicExpenses);
  }

  public editPeriodicExpenses(periodicExpenses:any,periodicExpensesId:number){
    return this.http.put(this.baseUrl+"/periodicExpenses/edit/"+periodicExpensesId,periodicExpenses);
  }

  public editPurchaseDemand(purchaseDto:any,purchaseId:number){
    return this.http.put(this.baseUrl+"/purchaseDemand/edit/"+purchaseId,purchaseDto);
  }

  public deletePeriodicExpenses(periodicExpensesId:number){
    return this.http.delete(this.baseUrl+"/periodicExpenses/delete/"+periodicExpensesId);
  }

  public getExpensesStatistics(){
    return this.http.get(this.baseUrl+"/statistics");
  }
}
