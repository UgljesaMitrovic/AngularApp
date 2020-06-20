import { TestBed } from '@angular/core/testing';

import { KaficService } from './kafic.service';

describe('KaficService', () => {
  let service: KaficService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KaficService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
