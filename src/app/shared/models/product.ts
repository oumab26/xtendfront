import { Provider } from "./provider";

export interface Product{
     productId:number;
     productName:string;
     price:number;
     description:string;
     link:string;
     provider :Provider;
}