import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Company } from 'src/app/shared/models/company';
import { Department } from 'src/app/shared/models/department';
import { Job } from 'src/app/shared/models/job';
import { CompanyserviceService } from 'src/app/shared/services/companyservice.service';

@Component({
  selector: 'app-company-settings',
  templateUrl: './company-settings.component.html',
  styleUrls: ['./company-settings.component.css']
})
export class CompanySettingsComponent implements OnInit {

  public company:Company;
  public companyName:String;
  public companyForm:FormGroup;
  public jobs:Job[];
  public departments:Department[];

  constructor(public companyservice:CompanyserviceService,
             public formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.getCompany();
    this.companyForm=this.formBuilder.group({
      companyName:[''],
      companyEmail :[''],
      phone:[''],
      address:[''],
      companyActivity:[''],
      personalSize:[''],
      numberofDaysTimeOff:[''],
      worktimetable:[''],
      dayOff:[''],
      jobs:[''],
      departments:['']
    });

  }

  getCompany(){
    let companyId=parseInt(localStorage.getItem("company"));
    this.companyservice.getCompany(companyId).subscribe((Response:Company)=>{
        this.company=Response;
        this.affectCompanyValue(this.company);
    });
  }


  addJob(){
    this.companyservice.addJobs(this.company.companyId,this.companyForm.value.jobs).subscribe((Response:Company)=>{
      this.affectCompanyValue(Response);
      this.companyForm.controls['jobs'].reset();
    })
  }

  addDepartment(){
    this.companyservice.addDepartments(this.company.companyId,this.companyForm.value.departments).subscribe((Response:Company)=>{
      this.affectCompanyValue(Response);
      this.companyForm.controls['departments'].reset();
    })
  }





  affectCompanyValue(company:Company){
    this.companyName=this.company.companyName;
    this.companyForm.controls['companyName'].setValue(company.companyName);
    this.companyForm.controls['companyEmail'].setValue(company.companyEmail);
    this.companyForm.controls['phone'].setValue(company.phone);
    this.companyForm.controls['address'].setValue(company.address);
    this.companyForm.controls['companyActivity'].setValue(company.companyActivity);
    this.companyForm.controls['personalSize'].setValue(company.personalSize);
    this.companyForm.controls['numberofDaysTimeOff'].setValue(company.numberOfDaysTimeOff);
    this.companyForm.controls['worktimetable'].setValue(company.worktimetable);
    this.companyForm.controls['dayOff'].setValue(company.dayOff);
    this.departments=company.departments;
    this.jobs=company.jobs;
  }

}
