import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExitPermissionResponseComponent } from './exit-permission-response.component';

describe('ExitPermissionResponseComponent', () => {
  let component: ExitPermissionResponseComponent;
  let fixture: ComponentFixture<ExitPermissionResponseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExitPermissionResponseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExitPermissionResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
