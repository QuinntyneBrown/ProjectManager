import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToDosComponent } from './to-dos.component';
import { UserStore, ToDoStore } from '@core';
import { of } from 'rxjs';

describe('ToDosComponent', () => {
  let component: ToDosComponent;
  let fixture: ComponentFixture<ToDosComponent>;

  beforeEach(async () => {
    const mockUserStore = jasmine.createSpyObj('UserStore', ['getCurrent']);
    const mockToDoStore = jasmine.createSpyObj('ToDoStore', ['toDoByProjectName']);
    mockUserStore.getCurrent.and.returnValue(of({ currentProjectName: 'test' } as any));
    mockToDoStore.toDoByProjectName.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [ToDosComponent],
      providers: [
        { provide: UserStore, useValue: mockUserStore },
        { provide: ToDoStore, useValue: mockToDoStore }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
