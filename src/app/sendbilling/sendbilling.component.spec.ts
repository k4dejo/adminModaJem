import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendbillingComponent } from './sendbilling.component';

describe('SendbillingComponent', () => {
  let component: SendbillingComponent;
  let fixture: ComponentFixture<SendbillingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendbillingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendbillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
