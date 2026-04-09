import { TestBed } from '@angular/core/testing';

import { Contact } from '../drug.model';

describe('Contact', () => {
  let service: Contact;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Contact);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
