import { TestBed } from '@angular/core/testing';

import { SelectedRideService } from './selected-ride.service';

describe('SelectedRideService', () => {
  let service: SelectedRideService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedRideService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
