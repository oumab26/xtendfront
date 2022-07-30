import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExitPermissionComponent } from './exit-permission.component';

describe('ExitPermissionComponent', () => {
  let component: ExitPermissionComponent;
  let fixture: ComponentFixture<ExitPermissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExitPermissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExitPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
