import { TestBed } from '@angular/core/testing';

import { Drug } from '../drug.model';

describe('Drug', () => {
  let service: Drug;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Drug);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
