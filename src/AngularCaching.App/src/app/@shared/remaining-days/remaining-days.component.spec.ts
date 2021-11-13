import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemainingDaysComponent } from './remaining-days.component';

describe('RemainingDaysComponent', () => {
  let component: RemainingDaysComponent;
  let fixture: ComponentFixture<RemainingDaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemainingDaysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemainingDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
