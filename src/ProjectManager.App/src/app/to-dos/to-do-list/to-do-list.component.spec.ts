import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToDoListComponent } from './to-do-list.component';
import { UserStore, ToDoStore } from '@core';
import { of } from 'rxjs';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

describe('ToDoListComponent', () => {
  let component: ToDoListComponent;
  let fixture: ComponentFixture<ToDoListComponent>;

  beforeEach(async () => {
    const mockUserStore = jasmine.createSpyObj('UserStore', ['getCurrent']);
    const mockToDoStore = jasmine.createSpyObj('ToDoStore', ['toDoByProjectName']);
    mockUserStore.getCurrent.and.returnValue(of({ currentProjectName: 'test' } as any));
    mockToDoStore.toDoByProjectName.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [ToDoListComponent],
      providers: [
        provideAnimations(),
        provideRouter([]),
        { provide: UserStore, useValue: mockUserStore },
        { provide: ToDoStore, useValue: mockToDoStore }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
