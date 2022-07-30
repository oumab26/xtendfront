import { HttpXhrBackend } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-Jwt';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/shared/models/user';
import { UserserviceService } from 'src/app/shared/services/userservice.service';
import {StoreService} from '../../shared/services/store.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
public isenable:boolean=true;
public basicInformation:boolean;
public socialMediaInformation:boolean;
public id:string;
public userInformationForm:FormGroup;
public userJobForm:FormGroup;
public userSocialForm:FormGroup;
public userCredentialsForm:FormGroup;
public fullname:string;
public job:string;
public username:string;
public user:User;
public key:any;
pen_color:string;

//add
userFile ;
public imagePath;
imgURL: any;
  imageSrc: string;
  constructor(public userService:UserserviceService,
              public storeService:StoreService,
              private formBuilder: FormBuilder,
              private toaster :ToastrService,
              private httpClient: HttpClient
              ) { }

  ngOnInit(): void {
    this.getConnectedUser();
    this.userInformationForm=this.formBuilder.group({
      Userid: null,
      firstname:[''],
      lastname :[''],
      gender:[''],
      dateOfBirth:[''],
      email:[''],
      phone:[''],
      civilisation:[''],
      address:[''],
      image:[''],
    });
    this.userJobForm=this.formBuilder.group({
      job:[''],
      startDate:[''],
      role:[''],
    });
    this.userSocialForm=this.formBuilder.group({
      facebook:[''],
      linkedin :[''],
      discord:[''],
      slack:['']
    });
    this.userCredentialsForm=this.formBuilder.group({
      username:['',Validators.required],
      oldPassword:['',Validators.required],
      newPassword:['',Validators.required],
      confirmPassword:['',Validators.required],
    });






  }





  decodeToken(){
    const token = localStorage.getItem('token');
    const decodedJwtJsonData = window.atob(token.split('.')[1]);
    const decodedJwtData = JSON.parse(decodedJwtJsonData) ;
    this.username=decodedJwtData.sub;
    this.userService.getUserByUsername(this.username).subscribe((Response:User)=>{
      this.user=Response;
      console.log("this.user 2", this.user);
      this.fullname=this.user.firstname+" "+this.user.lastname;
      this.job=this.user.job?.jobName;
      this.affectUserProfile(this.user);
      this.completeProfile(this.user);
      this.disableControls();
    });
  }

  getConnectedUser(){
    if(this.storeService.userData){
      this.storeService.user.subscribe(res=>this.user=res);
    }else{
      this.decodeToken();
    }
  }


  affichePen(){
    if(this.isenable===true){
      this.isenable=false;
      this.pen_color="black"
    }
    else{
      this.isenable=true;
      this.pen_color="white"
    }

  }

  completeProfile(user:User){
    if(user.firstname&&user.gender&&user.lastname&&user.email&&user.dateOfBirth&&user.phone&&user.address&&user.civilStatus){
      this.basicInformation=true;
    }else{this.basicInformation=false}
    if(user.discord || user.facebook || user.linkedin || user.slack){
      this.socialMediaInformation=true;
    }else{this.socialMediaInformation=false}
  }

  affectUserProfile(user1:User){
    let dob:Date;
    let dob1:any;
    let j_us:Date;
    if(user1.dateOfBirth){dob=new Date(user1.dateOfBirth[0],user1.dateOfBirth[1]-1,user1.dateOfBirth[2])}
    if(dob){dob1=dob.toISOString().substring(0,10);}
    if(user1.joinedUs){j_us=new Date(user1.joinedUs[0],user1.joinedUs[1]-1,user1.joinedUs[2])}
    let joinedUs=j_us.toISOString().substring(0,10);
    this.userInformationForm.controls['lastname'].setValue(user1.lastname);
    this.userInformationForm.controls['firstname'].setValue(user1.firstname);
    this.userInformationForm.controls['gender'].setValue(user1.gender);
    this.userInformationForm.controls['dateOfBirth'].setValue(dob1);
    this.userInformationForm.controls['phone'].setValue(user1.phone);
    this.userInformationForm.controls['civilisation'].setValue(user1.civilStatus);
    this.userInformationForm.controls['address'].setValue(user1.address);
    this.userInformationForm.controls['email'].setValue(user1.email);
    this.userInformationForm.controls['image'].setValue(user1.image);

    this.userJobForm.controls['job'].setValue(user1.job?.jobName);
    this.userJobForm.controls['startDate'].setValue(joinedUs);
    this.userJobForm.controls['role'].setValue(user1.role.roleName);

    this.userSocialForm.controls['facebook'].setValue(user1.facebook);
    this.userSocialForm.controls['linkedin'].setValue(user1.linkedin);
    this.userSocialForm.controls['discord'].setValue(user1.discord);
    this.userSocialForm.controls['slack'].setValue(user1.slack);

    this.userCredentialsForm.controls['username'].setValue(user1.username);
  }



  changePassword(){
    if(this.userCredentialsForm.valid &&
      this.userCredentialsForm.value.newPassword===this.userCredentialsForm.value.confirmPassword){
        let body={
          "username":this.userCredentialsForm.value.username,
          "oldPassword":this.userCredentialsForm.value.oldPassword,
          "newPassword":this.userCredentialsForm.value.newPassword
        }
        this.userService.changePassword(body,this.user.userId).subscribe((Response:string)=>{
          if (Response==="valid"){
            this.toaster.success("Votre mot de passe est changé avec succés")
          }else if(Response==="not valid"){
            this.toaster.warning("Veuillez vérifier vos coordonnées")
          }
        });
    }
  }


  editUsername(){
    let userId=this.user.userId;
    let value=this.userCredentialsForm.value.username;
    this.userService.editUsername(userId,value).subscribe((Response:any)=>{

      localStorage.removeItem("token");
      localStorage.setItem("token",Response);
      this.userCredentialsForm.controls['username'].setValue(value);
    })
  }

  editUserValue(key:string,value:string){
    let userId=this.user.userId;
    this.userService.editUser(this.user.userId,key,value).subscribe((Response:User)=>{
      this.user=Response;
      this.affectUserProfile(this.user);
      this.completeProfile(this.user);
    })
  }


  editLastname(){
    let key="lastname"
    let value=this.userInformationForm.value.lastname;
    this.editUserValue(key,value);
  }

  

  editImage(){
    
    let key="image"
    let value=this.userInformationForm.value.image;
    this.editUserValue(key,value);
  }
  





  editFirstname(){
    let key="firstname"
    let value=this.userInformationForm.value.firstname;
    this.editUserValue(key,value);
  }

  editGender(){
    let key="gender"
    let value=this.userInformationForm.value.gender;
    this.editUserValue(key,value);
  }

  editDateOfBirth(){
    let key="dateOfBirth"
    let value=this.userInformationForm.value.dateOfBirth;
    this.editUserValue(key,value);;
  }

  editEmail(){
    let key="email"
    let value=this.userInformationForm.value.email;
    this.editUserValue(key,value);
  }

  editPhone(){
    let key="phone"
    let value=this.userInformationForm.value.phone;
    this.editUserValue(key,value);
  }

  editCivilStatus(){
    let key="civilisation"
    let value=this.userInformationForm.value.civilisation;
    this.editUserValue(key,value);
  }

  editAddress(){
    let key="address"
    let value=this.userInformationForm.value.address;
    this.editUserValue(key,value);
  }

  editSlack(){
    let key="slack"
    let value=this.userSocialForm.value.slack;
    this.editUserValue(key,value);
  }

  editDiscord(){
    let key="discord"
    let value=this.userSocialForm.value.discord;
    this.editUserValue(key,value);
  }

  editFacebook(){
    let key="facebook"
    let value=this.userSocialForm.value.facebook;
    this.editUserValue(key,value);
  }

  editLinkedin(){
    let key="linkedin"
    let value=this.userSocialForm.value.linkedin;
    this.editUserValue(key,value);
  }



  disableControls(){
    this.userJobForm.controls["job"].disable();
    this.userJobForm.controls["startDate"].disable();
    this.userJobForm.controls["role"].disable();
  }

  cancelEditing(){
    this.affectUserProfile(this.user);
  }

//add


  
/**


  onFileChange(event) {
    const reader = new FileReader();
     
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
     
      reader.onload = () => {
    
        this.imageSrc = reader.result as string;
      
        this.userInformationForm.patchValue({
          fileSource: reader.result
        });
    
      };
    
    }
  }
    
  submit(){
    console.log(this.userInformationForm.value);
    this.httpClient.post('http://localhost:8000/Imgarticles/{userId}', this.userInformationForm.value)
      .subscribe(res => {
        this.postResponse = res;
        this.dbImage = 'data:image/jpeg;base64,' + this.postResponse.image;
        console.log(res);
        alert('Uploaded Successfully.');
      })
  }

  uploadedImage: File;
  dbImage: any;
  postResponse: any;
  successResponse: string;
  Userid: any;

  image: any;


  viewImage() {
    this.httpClient.get('http://localhost:8080/get/image/info/' + this.image)
      .subscribe(
        res => {
          this.postResponse = res;
          this.dbImage = 'data:image/jpeg;base64,' + this.postResponse.image;
        }
      );


/***
 * 
 * 
 *  res => {
          this.postResponse = res;
          this.dbImage = 'data:image/jpeg;base64,' + this.postResponse.image;
        }
 **/


//addd

selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;
  //Gets called when the user selects an image
  public onFileChanged(event) {
    //Select File
    this.selectedFile = event.target.files[0];
  }
  //Gets called when the user clicks on submit to upload the image
  onUpload() {
    console.log(this.selectedFile);
    
    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
  
    //Make a call to the Spring Boot Application to save the image
    this.httpClient.post('http://localhost:8000/image/upload', uploadImageData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          this.message = 'Image uploaded successfully';
        } else {
          this.message = 'Image not uploaded successfully';
        }
      }
      );
  }
    //Gets called when the user clicks on retieve image button to get the image from back end
    getImage() {
    //Make a call to Sprinf Boot to get the Image Bytes.
    this.httpClient.get('http://localhost:8000/api/user/get/image/' + this.imageName)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }



      }