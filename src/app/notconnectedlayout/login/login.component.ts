import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, FormGroupDirective, NgForm } from "@angular/forms";
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationModel } from 'src/app/shared/models/authenticationModel';
import { Role } from 'src/app/shared/models/role';
import { LoginserviceService } from 'src/app/shared/services/loginservice.service';
import { UserserviceService } from 'src/app/shared/services/userservice.service';
import{ User } from 'src/app/shared/models/user'


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  eyeSlash :boolean = true;
  public permission:string;
  public loginForm:FormGroup;
  public forgetPassword:boolean=false;
  loginResponse: any;
  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');
  authModel:AuthenticationModel=null;



  constructor(
    private formBuilder: FormBuilder,
    private loginservice    : LoginserviceService,
    private userservice :UserserviceService,
    private router :Router,
    private toaster :ToastrService,
    fb: FormBuilder
  ) {
    this.options = fb.group({
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl,
    });

   }


  ngOnInit(): void {
    this.loginForm=this.formBuilder.group({
      username:[''],
      password :['']
    });

  }

  passwordEye(){
    this.eyeSlash=!this.eyeSlash;
  }


  doLogin(){
      this.authModel=this.loginForm.value;
      this.loginservice.generateToken(this.authModel).subscribe((Response:any)=>{

      if (Response['message']==="invalid username"){
        this.toaster.error("Nom d'utilisateur invalid")
      }
      else if(Response['message']==="invalid password"){
        this.forgetPassword=true;
        this.toaster.warning("mot de passe érroné")
      }
      else{
        localStorage.setItem("token",Response.token);
        localStorage.setItem("company",Response.company);
        switch (Response.role.roleName) {
          case "MANAGER":{
            this.permission='5';
            break;
          }
          case "RH":{
            this.permission='4';
            break;
          }
          case "EMPLOYEE":{
            this.permission='3';
            break;
          }
          case "CONSULTANT":{
            this.permission='2';
            break;
          }
          case "INTERN":{
            this.permission='1';
            break;
          }
          default:{
            this.permission='0';
            break;
          }
        }
        localStorage.setItem("permission",this.permission);
        this.router.navigateByUrl("/profile");
      }

      });
  }

  goToResetPassword(){
    localStorage.setItem("resetPwd",this.authModel.username);
    this.router.navigateByUrl('/resetPassword')
  }














}
