import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, MaxLengthValidator, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ResetPasswordModel } from 'src/app/shared/models/resetPasswordModel';
import { User } from 'src/app/shared/models/user';
import { LoginserviceService } from 'src/app/shared/services/loginservice.service';
import { UserserviceService } from 'src/app/shared/services/userservice.service';


@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  eyeSlash :boolean = true;
  stepOneValid:boolean=false;
  resetPasswordModel:any;
  code: any;
  email:string;
  user:User;
  username:string;
  stepTwoValid: boolean=false;
  afficherBlock1: boolean=true;
  afficherBlock2: boolean=false;
  afficherBlock3: boolean=false;
  resendCode: boolean;


  constructor(private _formBuilder: FormBuilder,
              private loginservice: LoginserviceService,
              private toaster :ToastrService,
              public router :Router,
              private userservice:UserserviceService) { }

  ngOnInit(): void {
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
      code1 :['',Validators.maxLength(1)],
      code2 :['',Validators.maxLength(1)],
      code3 :[''],
      code4 :['']
    });
    this.thirdFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
      password :[''],
      confirmPassword :['']
    });
    this.getUserEmail();
  }


  getUserEmail(){
    this.userservice.getUserByUsername(localStorage.getItem("resetPwd")).subscribe((response:User)=>{
      this.username=response?.username;
      this.email=response?.email;
      localStorage.clear();
    })
  }

  passwordEye(){
    this.eyeSlash=!this.eyeSlash;
  }

  codeReset(){
    let body={
      "email":this.email,
      "username":this.username
    }
    this.resetPasswordModel=body;

    this.loginservice.generateCode(this.resetPasswordModel).subscribe((response)=>{
      if(response==="email invalid"){
        this.toaster.warning("email non valide");}
      else if (response==="mailing problem"){
        this.toaster.warning("problème lors d'envoie du mail");}
      else{
        this.afficherBlock1=false;
        this.afficherBlock2=true;
        this.afficherBlock3=false;
        this.code=response;
      };
    })
  }

  verifierCode(){
       let mycode = this.secondFormGroup.value.code1+this.secondFormGroup.value.code2
       +this.secondFormGroup.value.code3+this.secondFormGroup.value.code4;
      if(mycode===this.code){
          this.afficherBlock1=false;
          this.afficherBlock2=false;
          this.afficherBlock3=true;
        } else{
          this.toaster.warning("Code incorrect");
          this.resendCode=true;
        }
        }

  resendcode(){
    this.loginservice.generateCode(this.resetPasswordModel).subscribe((response)=>{
      if(response==="email invalid"){
        this.toaster.warning("email non valide");}
      else if (response==="mailing problem"){
        this.toaster.warning("problème lors d'envoie du mail");}
      else{
        this.afficherBlock1=false;
        this.afficherBlock2=true;
        this.afficherBlock3=false;
        this.code=response;
        this.toaster.success("un nouveau code est envoyé à votre adresse mail");
      };
    })

  }

  resetPassword(){
 if(this.thirdFormGroup.value.password===this.thirdFormGroup.value.confirmPassword){
   this.resetPasswordModel.code=this.code;
   this.resetPasswordModel.password=this.thirdFormGroup.value.password;
   this.loginservice.resetPassword(this.resetPasswordModel).subscribe((response)=>{
    this.toaster.info("ton mot de passe est changé avec succès")
    this.router.navigateByUrl('/login')
  },(error)=>{
  })
 }else{
   this.toaster.error("Veuillez confirmer votre mot de passe")
 }
  }





  }




