import { Component, OnInit } from '@angular/core';
import { Timing } from 'src/app/shared/models/timing';
import { TimingserviceService } from 'src/app/shared/services/timingservice.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

  public ClockIn : boolean;
  public clockOut :boolean;
  public timing:Timing;
  public timings:Timing[];
  Timings :any;
  myDate= Date.now();

  constructor(public timingservice: TimingserviceService) { }

  ngOnInit(): void {
    this.getTimings();
  }

  getTimings(){
    this.timingservice.getTodayTimings().subscribe((Response: Timing[])=>{
      this.timings=Response;
    })
  }

}
