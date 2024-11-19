import { TestBed } from '@angular/core/testing';

import {AplicacionesService } from './servcios-aplicaciones.service';

describe('ServciosAplicacionesService', () => {
  let service: AplicacionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AplicacionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
