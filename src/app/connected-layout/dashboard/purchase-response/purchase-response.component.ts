import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PurchaseserviceserviceService } from 'src/app/shared/services/purchaseserviceservice.service';

@Component({
  selector: 'app-purchase-response',
  templateUrl: './purchase-response.component.html',
  styleUrls: ['./purchase-response.component.css']
})
export class PurchaseResponseComponent implements OnInit {

  pendingDemands: any;

  constructor(private purchaseService:PurchaseserviceserviceService,
              private toaster :ToastrService) { }

  ngOnInit(): void {
    this.getPendingDemands();
  }

  getPendingDemands(){
    this.purchaseService.getPendingPurchasesDemand().subscribe((Response:any)=>{
      this.pendingDemands=Response;
    })
  }

  acceptDemand(purchaseId){
    this.purchaseService.acceptPurchaseDemand(purchaseId).subscribe((Response:any)=>{
      this.getPendingDemands();
      this.toaster.success("La demande d'achat est acceptée");
    })
  }

  rejectDemand(purchaseId){
    this.purchaseService.rejectPurchaseDemand(purchaseId).subscribe((Response:any)=>{
      this.getPendingDemands();
      this.toaster.success("La demande d'achat est rejetée");
    })
  }
}
