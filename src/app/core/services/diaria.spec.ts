import { TestBed } from '@angular/core/testing';

import { Diaria } from './diaria';

describe('Diaria', () => {
  let service: Diaria;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Diaria);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
