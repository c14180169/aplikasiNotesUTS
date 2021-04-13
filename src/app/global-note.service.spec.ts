import { TestBed } from '@angular/core/testing';

import { GlobalNoteService } from './global-note.service';

describe('GlobalNoteService', () => {
  let service: GlobalNoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalNoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
