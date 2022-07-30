import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { UserserviceService } from 'src/app/shared/services/userservice.service';
enum CheckBoxType { "MANAGER", "RH", "EMPLOYEE", "CONSULTANT", "INTERN" };

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  public basicInformation:boolean;
  public socialMediaInformation:boolean;
  public user:any;
  public showValidateModal:boolean=false;
  public valueOfRole:string;

  check_box_type = CheckBoxType;
  currentlyChecked: CheckBoxType;
  previouslychecked:CheckBoxType;
  userId: any;
  rr: CheckBoxType;




  constructor( public userService :UserserviceService,
    private router:ActivatedRoute) { }

  ngOnInit(): void {
    this.userId=this.router.snapshot.params['userId'];
    this.getuser(this.userId);
  }

  getuser(userId){
    this.userService.getOne(userId).subscribe((response)=>{
      this.user=response;
      this.roleChecked(this.user.role.roleName)
      this.completeProfile(this.user);
    })
  }
  selectCheckBox(targetType: CheckBoxType) {
    // If the checkbox was already checked, clear the currentlyChecked variable
    this.showModalvalider();
    this.previouslychecked=this.currentlyChecked;
    this.currentlyChecked = targetType;
  }
  completeProfile(user:User){
    if(user.firstname&&user.gender&&user.lastname&&user.email&&user.dateOfBirth&&user.phone&&user.address&&user.civilStatus){
      this.basicInformation=true;
    }else{this.basicInformation=false}
    if(user.discord || user.facebook || user.linkedin || user.slack){
      this.socialMediaInformation=true;
    }else{this.socialMediaInformation=false}
  }
  getRoleName(role){
    switch(role) {
      case 0 : {
         this.valueOfRole="MANAGER"
         break;
      }
      case 1 : {
        this.valueOfRole="RH"
        break;
     }
      case 2 : {
        this.valueOfRole="EMPLOYEE"
        break;
     }
      case 3 : {
        this.valueOfRole="CONSULTANT"
        break;
     }
      case 4 : {
        this.valueOfRole="INTERN"
        break;
      }
  }
  }


  roleChecked(role){
    switch(role) {
      case "MANAGER" : {
         this.currentlyChecked=this.check_box_type.MANAGER
         break;
      }
      case "RH": {
        this.currentlyChecked=this.check_box_type.RH
        break;
     }
      case "EMPLOYEE": {
         this.currentlyChecked=this.check_box_type.EMPLOYEE
         break;
      }
      case "CONSULTANT": {
        this.currentlyChecked=this.check_box_type.CONSULTANT
        break;
     }
     case "INTERN": {
      this.currentlyChecked=this.check_box_type.INTERN
      break;
   }
   }
  }

  showModalvalider(){
    this.showValidateModal=true;
  }
  hideValidateModal(){
    this.currentlyChecked=this.previouslychecked;
    this.showValidateModal=false;
  }
  changeRole(){
     let userId=this.user.userId;
     this.getRoleName(this.currentlyChecked);
    this.userService.changeRole(userId,this.valueOfRole).subscribe((Response:string)=>{
      this.showValidateModal=false;

    })

  }
}
