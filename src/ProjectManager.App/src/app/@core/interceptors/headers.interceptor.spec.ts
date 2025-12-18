import { TestBed } from '@angular/core/testing';
import { headersInterceptor } from './headers.interceptor';
import { HttpInterceptorFn } from '@angular/common/http';

describe('headersInterceptor', () => {
  it('should be created', () => {
    const interceptor: HttpInterceptorFn = headersInterceptor;
    expect(interceptor).toBeTruthy();
  });
});
