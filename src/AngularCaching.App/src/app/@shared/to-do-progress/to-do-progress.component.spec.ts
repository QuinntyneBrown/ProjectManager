import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoProgressComponent } from './to-do-progress.component';

describe('ToDoProgressComponent', () => {
  let component: ToDoProgressComponent;
  let fixture: ComponentFixture<ToDoProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToDoProgressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
