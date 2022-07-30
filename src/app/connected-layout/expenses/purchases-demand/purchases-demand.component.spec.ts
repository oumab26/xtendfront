import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasesDemandComponent } from './purchases-demand.component';

describe('PurchasesDemandComponent', () => {
  let component: PurchasesDemandComponent;
  let fixture: ComponentFixture<PurchasesDemandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchasesDemandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasesDemandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
