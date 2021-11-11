import { TestBed } from '@angular/core/testing';

import { ToDos } from './to-dos.service';

describe('ToDosService', () => {
  let service: ToDos;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToDos);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
