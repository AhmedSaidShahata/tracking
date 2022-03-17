import { TestBed, inject } from '@angular/core/testing';

import { PdfServiceService } from './pdf-service.service';

describe('PdfServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PdfServiceService]
    });
  });

  it('should be created', inject([PdfServiceService], (service: PdfServiceService) => {
    expect(service).toBeTruthy();
  }));
});
