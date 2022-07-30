import { Component, OnInit, Provider } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PurchaseserviceserviceService } from 'src/app/shared/services/purchaseserviceservice.service';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css']
})
export class ProvidersComponent implements OnInit {
  providers: any;
  showModal: boolean;
  ProviderForm:FormGroup;
  UpdateProviderForm:FormGroup;
  showModalUpdate: boolean;
  updatedProviderId: any;

  constructor(public formBuilder:FormBuilder,
              private toaster :ToastrService,
              private purchaseService:PurchaseserviceserviceService) { }

  ngOnInit(): void {
    this.getProviders();
    this.ProviderForm=this.formBuilder.group({
      name:['',Validators.required],
      email:['',Validators.required],
      address:['',Validators.required],
      phone:['',Validators.required],
      siteWeb:['',Validators.required]
    })
    this.UpdateProviderForm=this.formBuilder.group({
      name:['',Validators.required],
      email:['',Validators.required],
      address:['',Validators.required],
      phone:['',Validators.required],
      siteWeb:['',Validators.required]
    })
  }

  getProviders(){
    this.purchaseService.getProviders().subscribe((Response:any)=>{
      this.providers=Response;
  })}

  addProvider(){
    if(this.ProviderForm.valid){
      let provider:Provider=this.ProviderForm.value;
      this.purchaseService.addProvider(provider).subscribe((Response:any)=>{
        this.getProviders();
        this.hideModal();
        this.toaster.success("Le fournisseur est ajouté avec succès")
      },(error:any)=>{
      })
    }else{
      this.toaster.warning("Veuillez vérifier les champs")
    }

  }

  goToUpdateProvider(providerID){
    this.showModalUpdate=true;
    let provider=this.providers.filter(x=>x.providerID===providerID)[0];
    this.updatedProviderId=provider.providerID;
    this.UpdateProviderForm.controls['name'].setValue(provider.name);
    this.UpdateProviderForm.controls['email'].setValue(provider.email);
    this.UpdateProviderForm.controls['address'].setValue(provider.address);
    this.UpdateProviderForm.controls['phone'].setValue(provider.phone);
    this.UpdateProviderForm.controls['siteWeb'].setValue(provider.siteWeb);
  }

  updateProvider(){
    if(this.UpdateProviderForm.valid){
      this.purchaseService.editProvider(this.UpdateProviderForm.value,this.updatedProviderId).subscribe((Response:any)=>{
        this.getProviders();
        this.hideModal();
        this.toaster.success("l'élement est modifié avec succés");
      })
    }else{
      this.toaster.warning("Veuillez vérifier vos champs");
    }

  }

  deletProvider(providerID){
    this.purchaseService.deleteProvider(providerID).subscribe((Response:any)=>{
      this.getProviders();
    })
  }

  hideModal(){
    this.showModal=false;
    this.showModalUpdate=false;
  }

  goToAddProvider(){
    this.showModal=true;
  }


}
