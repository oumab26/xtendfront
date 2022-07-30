import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Company } from 'src/app/shared/models/company';
import { User, UserDto } from 'src/app/shared/models/user';
import { CompanyserviceService } from 'src/app/shared/services/companyservice.service';
import { UserserviceService } from 'src/app/shared/services/userservice.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  eyeSlash:boolean=true;
  company:Company;
  myCompany:Company;
  user:UserDto;
  users:UserDto[]=[];
  data:any;

  public companyForm:FormGroup;
  public userForm:FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private companyService:CompanyserviceService,
    private userservice :UserserviceService,
    private router :Router,
    private toaster :ToastrService
  ) { }
  ngOnInit(): void {
    this.companyForm=this.formBuilder.group({
      firstCtrl: [''],
      companyName:['', Validators.required],
      personalSize:['', Validators.required],
      companyActivity:['', Validators.required],
      phone:['', Validators.required],
      address:['', Validators.required],
    })
      this.userForm=this.formBuilder.group({
      secondCtrl: [''],
      firstname:['', Validators.required],
      lastname:['', Validators.required],
      username:['', Validators.required],
      email:['',   [Validators.required, Validators.email]],
      password:['', Validators.required],
      })
  }


  get uf() { return this.userForm.controls; }
  get uc() { return this.companyForm.controls; }
  signup(){

   
if (this.userForm.valid && this.companyForm.valid) {
 
      this.company=this.companyForm.value;
      this.user=this.userForm.value;
      this.users.push(this.user);
      this.company.users=this.users;
    

      this.companyService.addCompany(this.company).subscribe((Response:string)=>{

        this.userservice.getUserByUsername(this.user.username).subscribe((Response1:User)=>{
          
          this.toaster.success("Employé ajouté avec succés");localStorage.setItem("token",Response);
          localStorage.setItem("company",Response1.companyId);
          localStorage.setItem("permission",'5');
          this.router.navigateByUrl("/company-settings");
        })
      },(error:any)=>{
       

      })
    
    }
    else{
      this.toaster.warning("veuillez vérifier les champs");
    }
     
      }  

      passwordEye(){
        this.eyeSlash=!this.eyeSlash;
      }

}






