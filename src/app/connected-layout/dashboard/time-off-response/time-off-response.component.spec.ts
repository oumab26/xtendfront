import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeOffResponseComponent } from './time-off-response.component';

describe('TimeOffResponseComponent', () => {
  let component: TimeOffResponseComponent;
  let fixture: ComponentFixture<TimeOffResponseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeOffResponseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeOffResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
