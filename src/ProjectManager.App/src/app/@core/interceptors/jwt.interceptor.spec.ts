import { TestBed } from '@angular/core/testing';
import { jwtInterceptor } from './jwt.interceptor';
import { HttpInterceptorFn } from '@angular/common/http';

describe('jwtInterceptor', () => {
  it('should be created', () => {
    const interceptor: HttpInterceptorFn = jwtInterceptor;
    expect(interceptor).toBeTruthy();
  });
});
