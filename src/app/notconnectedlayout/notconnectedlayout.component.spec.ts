import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotconnectedlayoutComponent } from './notconnectedlayout.component';

describe('NotconnectedlayoutComponent', () => {
  let component: NotconnectedlayoutComponent;
  let fixture: ComponentFixture<NotconnectedlayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotconnectedlayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotconnectedlayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
