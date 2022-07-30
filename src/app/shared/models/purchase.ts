import { Product } from "./product";
import { User } from "./user";

export interface Purchase{
      purchaseId:number;
      quantity:number;
      totalPrice:number;
      date:Date;
      product: Product;
      user:User;
}

export interface PurchaseDto{
      userId:number;
      purchaseId:number;
      productName:string;
      link:string;
      quantity:number;
      price:number;
      need:string;
      description:string;
      providerID:number;
 }

 export interface PurchaseDetailsDto{
      purchaseId:number;
      productName:string;
      link:string;
      quantity:number;
      price:number;
      need:string;
      providerName:string;
      providerID:number;
 }