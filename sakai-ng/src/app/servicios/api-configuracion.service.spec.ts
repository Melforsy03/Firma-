import { TestBed } from '@angular/core/testing';

import { ApiConfiguracionService } from './api-configuracion.service';

describe('ApiConfiguracionService', () => {
  let service: ApiConfiguracionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiConfiguracionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
