import { TestBed } from '@angular/core/testing';
import {MyService} from './servcios-api.service' ;

describe('ServciosApiService', () => {
  let service: MyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
