
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evaluation } from '../model/evaluation';

@Injectable()
export abstract class EvaluatorService {
  abstract evaluate(pre: string, n: string, post: string): Observable<Evaluation[]>
}