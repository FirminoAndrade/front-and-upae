import { TestBed } from '@angular/core/testing';

import { AgendaService } from './agendaservice';

describe('Agendaservice', () => {
  let service: AgendaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgendaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
