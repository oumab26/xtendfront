import { OnInit } from '@angular/core';
import { TimingserviceService } from 'src/app/shared/services/timingservice.service';
import { UserserviceService } from 'src/app/shared/services/userservice.service';
import { JwtHelperService } from '@auth0/angular-Jwt';
import { User } from 'src/app/shared/models/user';
import { ActivityReport } from 'src/app/shared/models/activityReport';
import {Component,ChangeDetectionStrategy,ViewChild,TemplateRef} from '@angular/core';
import {startOfDay,endOfDay,subDays,addDays,endOfMonth,isSameDay,isSameMonth,addHours,} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {CalendarEvent,CalendarEventAction,CalendarEventTimesChangedEvent,CalendarView,} from 'angular-calendar';

const colors: any = {
  red: {
    primary: '#EA1601',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#0075D6',
    secondary: '#5CB6FF',
  },
  yellow: {
    primary: '#FAD202',
    secondary: '#FDF1BA',
  },
  green: {
    primary: '#64BC26',
    secondary: '#64BC26',
  },
  black: {
    primary: '#212121',
    secondary: '#666666',
  },
  orange: {
    primary: '#EF8200',
    secondary: '#FFBF70',
  },

};
@Component({
  selector: 'app-activity-report',
  templateUrl: './activity-report.component.html',
  styleUrls: ['./activity-report.component.css']
})

export class ActivityReportComponent implements OnInit {
  user: User;
  events: CalendarEvent[]=[];
  eventsready: boolean;

  constructor(public userService:UserserviceService,
              public timingService:TimingserviceService,
              private modal: NgbModal) { }

  ngOnInit(): void {
    this.decodeToken()
  }

  getUserCra(userId,month,year){
    let body:CalendarEvent<any>;
    this.timingService.getActivityReport(userId,month,year).subscribe((Response:ActivityReport[])=>{

      Response.forEach(element => {

        switch (element.activity){
          case "Worked" :{
            body={
              "start":new Date(element.date[0],element.date[1]-1,element.date[2],8, 0, 0),
              "end":new Date(element.date[0],element.date[1]-1,element.date[2],17, 0, 0),
              "title": element.activity,
              "draggable": true,
              "color": colors.green,
            }
            break;
          }
          case "Absent" :{
            body={
              "start":new Date(element.date[0],element.date[1]-1,element.date[2],8, 0, 0),
              "end":new Date(element.date[0],element.date[1]-1,element.date[2],17, 0, 0),
              "title": element.activity,
              "draggable": true,
              "color": colors.red
            }
            break;
          }
          case "Leave" :{
            body={
              "start":new Date(element.date[0],element.date[1]-1,element.date[2],8, 0, 0),
              "end":new Date(element.date[0],element.date[1]-1,element.date[2],17, 0, 0),
              "title": element.activity,
              "draggable": true,
              "color": colors.orange
            }
            break;
          }
          case "ExitPermission" :{
            body={
              "start":new Date(element.date[0],element.date[1]-1,element.date[2],14, 0, 0),
              "end":new Date(element.date[0],element.date[1]-1,element.date[2],16, 0, 0),
              "title": element.activity,
              "draggable": true,
              "color": colors.yellow
            }
            break;
          }
          case "Weekend" :{
            body={
              "start":new Date(element.date[0],element.date[1]-1,element.date[2],8, 0, 0),
              "end":new Date(element.date[0],element.date[1]-1,element.date[2],17, 0, 0),
              "title": element.activity,
              "draggable": true,
              "color": colors.blue
            }
            break;
          }case "Holiday" :{
            body={
              "start":new Date(element.date[0],element.date[1]-1,element.date[2],8, 0, 0),
              "end":new Date(element.date[0],element.date[1]-1,element.date[2],17, 0, 0),
              "title": element.activity,
              "draggable": true,
              "color": colors.black
            }
            break;
          }
        }

        this.events.push(body)
      });
      this.eventsready=true;
    })
  }


  decodeToken(){
    const token = localStorage.getItem('token');
    const decodedJwtJsonData = window.atob(token.split('.')[1]);
    const decodedJwtData = JSON.parse(decodedJwtJsonData) ;
    let username=decodedJwtData.sub;
    this.userService.getUserByUsername(username).subscribe((Response:User)=>{
      this.user=Response;
      const d=new Date();
      this.getUserCra(this.user.userId,d.getMonth()+1,d.getFullYear());
    });
  }
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh: Subject<any> = new Subject();

  // events: CalendarEvent[] = [
  //   {
  //     start: subDays(startOfDay(new Date()), 1),
  //     end: addDays(new Date(), 1),
  //     title: 'A 3 day event',
  //     color: colors.red,
  //     actions: this.actions,
  //     allDay: true,
  //     resizable: {
  //       beforeStart: true,
  //       afterEnd: true,
  //     },
  //     draggable: true,
  //   },
  //   {
  //     start: startOfDay(new Date()),
  //     title: 'An event with no end date',
  //     color: colors.yellow,
  //     actions: this.actions,
  //   },
  //   {
  //     start: subDays(endOfMonth(new Date()), 3),
  //     end: addDays(endOfMonth(new Date()), 3),
  //     title: 'A long event that spans 2 months',
  //     color: colors.blue,
  //     allDay: true,
  //   },
  //   {
  //     start: addHours(startOfDay(new Date()), 2),
  //     end: addHours(new Date(), 2),
  //     title: 'A draggable and resizable event',
  //     color: colors.yellow,
  //     actions: this.actions,
  //     resizable: {
  //       beforeStart: true,
  //       afterEnd: true,
  //     },
  //     draggable: true,
  //   },
  // ];

  activeDayIsOpen: boolean = true;


  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
