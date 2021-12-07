import { TestBed } from '@angular/core/testing';

import { CaptchaEnableService } from './captcha-enable.service';

describe('CaptchaEnableService', () => {
  let service: CaptchaEnableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaptchaEnableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
