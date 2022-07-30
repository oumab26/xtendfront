import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PurchaseserviceserviceService } from 'src/app/shared/services/purchaseserviceservice.service';

@Component({
  selector: 'app-periodic-expenses',
  templateUrl: './periodic-expenses.component.html',
  styleUrls: ['./periodic-expenses.component.css']
})
export class PeriodicExpensesComponent implements OnInit {

  periodicExpenses:any;
  showModal: boolean;
  PeriodicDepenseForm:FormGroup;
  UpdatePeriodicDepenseForm:FormGroup;
  showModalUpdate: boolean;
  updatedPeriodicExpensesId: any;

  constructor(public formBuilder:FormBuilder,
              private toaster :ToastrService,
              private purchaseService:PurchaseserviceserviceService) { }

  ngOnInit(): void {
    this.getPeriodicExpenses();

    this.PeriodicDepenseForm=this.formBuilder.group({
      name:['',Validators.required],
      period:['',Validators.required],
      note:['',Validators.required],
      amount:['',Validators.required],
    })
    this.UpdatePeriodicDepenseForm=this.formBuilder.group({
      name:['',Validators.required],
      period:['',Validators.required],
      note:['',Validators.required],
      amount:['',Validators.required],
    })
  }



  getPeriodicExpenses(){
    this.purchaseService.getPeriodicExpenses().subscribe((Response:any)=>{
      this.periodicExpenses=Response;
    })
  }

  addExpenses(){
    this.purchaseService.addPeriodicExpenses(this.PeriodicDepenseForm.value,parseInt(localStorage.getItem('company'))).subscribe((Response:any)=>{
      this.toaster.success("La dépense est ajoutée avec succès");
      this.hideModal();
      this.getPeriodicExpenses();
    })
  }

  deleteEpenses(periodicExpensesId){
    this.purchaseService.deletePeriodicExpenses(periodicExpensesId).subscribe((Response:any)=>{
      this.toaster.success("la dépense est supprimée avec succès");
      this.getPeriodicExpenses();
    })
  }

  goToUpdateEpenses(periodicExpensesId){
    let period:number;
    let periodicExpense=this.periodicExpenses.filter(x=>x.periodicExpensesId===periodicExpensesId)[0];
    this.updatedPeriodicExpensesId=periodicExpense.periodicExpensesId;
    switch(periodicExpense.period){
      case "HEBDOMADAIRE":{
        period=0;
        break;
      }
      case "BIMENSUEL":{
        period=1;
        break;
      }
      case "MENSUEL":{
        period=2;
        break;
      }case "BIMESTRIEL":{
        period=3;
        break;
      }case "TRIMESTRIEL":{
        period=4;
        break;
      }case "SEMESTRIEL":{
        period=5;
        break;
      }case "ANNUEL":{
        period=6;
        break;
      }
    }
    this.UpdatePeriodicDepenseForm.controls['name'].setValue(periodicExpense.name);
    this.UpdatePeriodicDepenseForm.controls['period'].setValue(period);
    this.UpdatePeriodicDepenseForm.controls['note'].setValue(periodicExpense.note);
    this.UpdatePeriodicDepenseForm.controls['amount'].setValue(periodicExpense.amount);
    this.showmodalUpdate();
  }

  updateExpenses(){
    if(this.UpdatePeriodicDepenseForm.valid){
    this.purchaseService.editPeriodicExpenses(this.UpdatePeriodicDepenseForm.value,this.updatedPeriodicExpensesId).subscribe((Response:any)=>{
      this.hideModal();
      this.getPeriodicExpenses();
      this.toaster.success("l'élement est modifié avec succés");
    })
  }else{
    this.toaster.warning("Veuillez vérifier vos champs");
  }
  }


  hideModal(){
    this.showModal=false;
    this.showModalUpdate=false;
  }

  showmodal(){
    this.showModal=true;
  }

  showmodalUpdate(){
    this.showModalUpdate=true;
  }

}
