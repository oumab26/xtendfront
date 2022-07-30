import { Component, OnInit } from '@angular/core';
import { Absence } from 'src/app/shared/models/absence';
import { AbsenceserviceService } from 'src/app/shared/services/absenceservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public absenceService:AbsenceserviceService) { }

  myAbsences:any;

  ngOnInit(): void {
    // this.getAbsences();
    this.getAbsences();



  }

  getAbsences(){
    let absences: Absence[]=[];
    this.absenceService.getAllAbsence().subscribe((Response)=>{
      this.myAbsences=Response;
      this.myAbsences.forEach(element => {
        absences.push(element);
      });
    })
  }


}
