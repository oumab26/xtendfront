import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectedLayoutComponent } from './connected-layout.component';

describe('ConnectedLayoutComponent', () => {
  let component: ConnectedLayoutComponent;
  let fixture: ComponentFixture<ConnectedLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectedLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectedLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
