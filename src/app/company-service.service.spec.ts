import { TestBed, inject } from '@angular/core/testing';

import { CompanyServiceService } from './company-service.service';

describe('CompanyServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompanyServiceService]
    });
  });

  it('should be created', inject([CompanyServiceService], (service: CompanyServiceService) => {
    expect(service).toBeTruthy();
  }));
});
