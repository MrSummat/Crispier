
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SequenceError } from '../model/sequenceError';

@Injectable()
export abstract class ContributionService {
  abstract postFile(fileToUpload: File): Observable<SequenceError[]>
}