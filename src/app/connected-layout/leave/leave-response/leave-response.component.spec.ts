import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveResponseComponent } from './leave-response.component';

describe('LeaveResponseComponent', () => {
  let component: LeaveResponseComponent;
  let fixture: ComponentFixture<LeaveResponseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveResponseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
