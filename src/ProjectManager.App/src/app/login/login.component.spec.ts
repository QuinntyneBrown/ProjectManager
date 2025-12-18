import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthStore, NavigationService } from '@core';
import { of } from 'rxjs';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthStore: jasmine.SpyObj<AuthStore>;
  let mockNavigationService: jasmine.SpyObj<NavigationService>;

  beforeEach(async () => {
    mockAuthStore = jasmine.createSpyObj('AuthStore', ['tryToLogin']);
    mockNavigationService = jasmine.createSpyObj('NavigationService', ['redirectPreLogin']);
    mockAuthStore.tryToLogin.and.returnValue(of({}));

    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        provideAnimations(),
        { provide: AuthStore, useValue: mockAuthStore },
        { provide: NavigationService, useValue: mockNavigationService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with username and password fields', () => {
    expect(component.form.get('username')).toBeTruthy();
    expect(component.form.get('password')).toBeTruthy();
  });

  it('should require username and password', () => {
    expect(component.form.valid).toBeFalsy();
    
    component.form.patchValue({
      username: 'test',
      password: 'test123'
    });
    
    expect(component.form.valid).toBeTruthy();
  });
});
