import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartComponent } from './apart.component';

describe('ApartComponent', () => {
  let component: ApartComponent;
  let fixture: ComponentFixture<ApartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
