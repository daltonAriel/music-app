import { TestBed } from '@angular/core/testing';

import { SignupHttpService } from './signup-http.service';

describe('SignupHttpService', () => {
  let service: SignupHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignupHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
