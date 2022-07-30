import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodicExpensesComponent } from './periodic-expenses.component';

describe('PeriodicExpensesComponent', () => {
  let component: PeriodicExpensesComponent;
  let fixture: ComponentFixture<PeriodicExpensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodicExpensesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodicExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
