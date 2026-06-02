import { TestBed } from '@angular/core/testing';

import { Especialidade } from './especialidade';

describe('Especialidade', () => {
  let service: Especialidade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Especialidade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
