import { TestBed } from '@angular/core/testing';

import { DatastoreServiceService } from './datastore-service.service';

describe('DatastoreServiceService', () => {
  let service: DatastoreServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatastoreServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
