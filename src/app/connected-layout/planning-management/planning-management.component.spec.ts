import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningManagementComponent } from './planning-management.component';

describe('PlanningManagementComponent', () => {
  let component: PlanningManagementComponent;
  let fixture: ComponentFixture<PlanningManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanningManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanningManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
