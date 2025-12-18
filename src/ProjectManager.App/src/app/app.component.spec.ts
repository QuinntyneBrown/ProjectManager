import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ProjectStore, UserStore } from '@core';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';

describe('AppComponent', () => {
  let mockProjectStore: jasmine.SpyObj<ProjectStore>;
  let mockUserStore: jasmine.SpyObj<UserStore>;

  beforeEach(async () => {
    mockProjectStore = jasmine.createSpyObj('ProjectStore', ['getProjects']);
    mockUserStore = jasmine.createSpyObj('UserStore', ['getCurrent']);
    mockUserStore.getCurrent.and.returnValue(of({ username: 'test' } as any));

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter([]),
        { provide: ProjectStore, useValue: mockProjectStore },
        { provide: UserStore, useValue: mockUserStore }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
