import { Injectable } from '@angular/core';
import { Observable, of, forkJoin } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http'
import { catchError, map, tap, combineAll, concatMap } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { Evaluation } from '../model/evaluation';
import { EvaluatorService } from './evaluator.service';

@Injectable({
  providedIn: 'root'
})
export class EvaluatorServiceImpl implements EvaluatorService {

  path: string = "/evaluators/"
  evaluators: Set<string> = new Set<string>([
    "scc",
    "crisprscan",
    "crisprater"
  ]);

  constructor(private http: HttpClient) { }

  evaluate(pre: string, n: string, post: string): Observable<Evaluation[]> {

    let params = new HttpParams().set("pre", pre);
    params = n ? params.append("n", n) : params
    params = post ? params.append("post", post) : params

    let evaluations = of(...this.evaluators).pipe(concatMap(evaluator => forkJoin(
      this.http.get<Evaluation>(environment.apiUrl + this.path + evaluator, { params: params })
        .pipe(
          map((data) => new Evaluation(data['name'], data['score'], data['assessment'])),
          // tap(() => this.log("Coeficients obtained from server: " + this.path)),
          catchError(this.handleError<Evaluation>('EvaluatorService: evaluate'))
        )
    )));

    return evaluations.pipe(combineAll());

  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    // this.messageService.add('HeroService: ' + message);
    console.log(message)
  }
}
