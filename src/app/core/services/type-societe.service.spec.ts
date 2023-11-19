import { TestBed } from '@angular/core/testing';

import { TypeSocieteService } from './type-societe.service';

describe('TypeSocieteService', () => {
  let service: TypeSocieteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeSocieteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
