import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TimeOff } from 'src/app/shared/models/timeOff';
import { TimeoffserviceService } from 'src/app/shared/services/timeoffservice.service';
import { UserserviceService } from 'src/app/shared/services/userservice.service';
import { MatPaginator} from '@angular/material/paginator';
import { MatTableModule} from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';



@Component({
  selector: 'app-global-view',
  templateUrl: './global-view.component.html',
  styleUrls: ['./global-view.component.css']
})
export class GlobalViewComponent implements OnInit {

  globaTimeOffs:Observable<any>;
  users: any;

  constructor(private timeOffService:TimeoffserviceService,
              private userService:UserserviceService) { }



  ngOnInit() {
    this.getAllTimeOffs();
  }
  getAllTimeOffs(){
    let companyId=localStorage.getItem('company')
    this.timeOffService.getGlobalTimeOff(parseInt(companyId)).subscribe((Response:any)=>{
      this.globaTimeOffs=Response;
    })
  }

}



