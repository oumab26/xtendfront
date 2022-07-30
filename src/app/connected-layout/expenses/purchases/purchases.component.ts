import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { JwtHelperService } from '@auth0/angular-Jwt';
import { PurchaseserviceserviceService } from 'src/app/shared/services/purchaseserviceservice.service';
import { UserserviceService } from 'src/app/shared/services/userservice.service';
import { User } from 'src/app/shared/models/user';
import { PurchaseDetailsDto, PurchaseDto } from 'src/app/shared/models/purchase';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.css']
})
export class PurchasesComponent implements OnInit {
  showModal: boolean;
  purchaseUpdate:PurchaseDetailsDto;
  PurchaseDemandForm:FormGroup;
  EditPurchaseDemandForm:FormGroup;
  providers:any;
  showModalProviders: boolean;
  user: any;
  pendingDemands: PurchaseDetailsDto[];
  historyDemands: PurchaseDetailsDto[];
  showModalUpdate: boolean;
  updatedPurchaseId: any;

  constructor(public formBuilder:FormBuilder,
              private userService:UserserviceService,
              private toaster :ToastrService,
              private purchaseService:PurchaseserviceserviceService) { }

  ngOnInit(): void {
    this.PurchaseDemandForm=this.formBuilder.group({
      productName:['',Validators.required],
      price:['',Validators.required],
      quantity:['',Validators.required],
      link:[''],
      need:[''],
      providerID:['']
    })

    this.EditPurchaseDemandForm=this.formBuilder.group({
      productName:['',Validators.required],
      price:['',Validators.required],
      quantity:['',Validators.required],
      link:[''],
      need:[''],
      providerID:['']
    })

    this.decodeToken();
    this.getProviders();

  }


  addPurchaseDemand(){
    let purchaseDto:PurchaseDto=this.PurchaseDemandForm.value;
    purchaseDto.userId=this.user.userId;

    this.purchaseService.addPurchaseDemand(purchaseDto).subscribe((Response:any)=>{
      this.toaster.success("La demande d'achat est ajoutée avec succés");
      this.getPendingDemands();
      this.hideModal();
    },(error:any)=>{
      this.toaster.warning("Veuillez vérifier votre demande")
    })
  }

  getProviders(){
    this.purchaseService.getProviders().subscribe((Response:any)=>{
      this.providers=Response;
  })
  }

  getPendingDemands(){
    this.purchaseService.getPendingPurchasesByUser(this.user.userId).subscribe((Response:PurchaseDetailsDto[])=>{
      this.pendingDemands=Response;
    })
  }

  getHistoryDemands(){
    this.purchaseService.getHistoryPurchasesByUser(this.user.userId).subscribe((Response:PurchaseDetailsDto[])=>{
      this.historyDemands=Response;
    })
  }


  decodeToken(){
    const token = localStorage.getItem('token');
    const decodedJwtJsonData = window.atob(token.split('.')[1]);
    const decodedJwtData = JSON.parse(decodedJwtJsonData) ;
    let username=decodedJwtData.sub;
    this.userService.getUserByUsername(username).subscribe((Response:User)=>{
      this.user=Response;
      this.getPendingDemands();
      this.getHistoryDemands();
    });
  }

  cancelPurchase(purchaseId){
    this.purchaseService.cancelPurchaseDemand(purchaseId).subscribe((Response:string)=>{
        this.getHistoryDemands();
        this.getPendingDemands();
        this.toaster.success("la demande est annulée");
    })
  }

  hideModal(){
    this.showModal=false;
    this.showModalUpdate=false;
  }

  addDemand(){
    this.showModal=true;
  }

  editPurchase(purchaseId){

    this.purchaseUpdate=this.pendingDemands.filter(x=>x.purchaseId===purchaseId)[0];
    this.updatedPurchaseId=purchaseId;
    let provider=this.getProvider(this.purchaseUpdate.providerName);
    this.purchaseUpdate.providerID=provider.providerID;
    this.EditPurchaseDemandForm.controls['productName'].setValue(this.purchaseUpdate.productName);
    this.EditPurchaseDemandForm.controls['price'].setValue(this.purchaseUpdate.price);
    this.EditPurchaseDemandForm.controls['quantity'].setValue(this.purchaseUpdate.quantity);
    this.EditPurchaseDemandForm.controls['link'].setValue(this.purchaseUpdate.link);
    this.EditPurchaseDemandForm.controls['need'].setValue(this.purchaseUpdate.need);
    this.EditPurchaseDemandForm.controls['providerID'].setValue(provider.providerID);
    this.showModalUpdate=true;
  }

  updatePurchaseDemand(){
    if(this.EditPurchaseDemandForm.valid){
      this.purchaseUpdate=this.EditPurchaseDemandForm.value;
      this.purchaseService.editPurchaseDemand(this.purchaseUpdate,this.updatedPurchaseId).subscribe((Response:any)=>{
        this.showModalUpdate=false;
        this.getPendingDemands();
        this.toaster.success("l'élement est modifié avec succés")
      })
    }else{
      this.toaster.error("Veuillez remplir les champs")
    }
  }

  getProvider(providerName){
   return this.providers.filter(x=>x.name===providerName)[0];
  }

  goToAddProvider(){
    this.showModalProviders=true;
    this.hideModal();
  }
}
