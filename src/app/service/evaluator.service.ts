import { Injectable } from '@angular/core';
import { Observable, of, forkJoin } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { catchError, map, tap, mergeMap, combineAll } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { Evaluation } from '../model/evaluation';

@Injectable({
  providedIn: 'root'
})
export class EvaluatorService {

  // TODO: cargarlos de un fichero de configuración
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

    let a = of(...this.evaluators).pipe(mergeMap(evaluator => forkJoin(
      this.http.get<Evaluation>(environment.apiUrl + this.path + evaluator, { params: params })
        .pipe(
          map((data) => new Evaluation(data['name'], data['score'], data['assessment'])),
          // tap(() => this.log("Coeficients obtained from server: " + this.path)),
          // tap((result) => console.log(result)),
          catchError(this.handleError<Evaluation>('EvaluatorService: evaluate'))
        )
    )));

    return a.pipe(combineAll());

    // return forkJoin(
    //   this.http.get<Evaluation>(environment.apiUrl + this.evaluators, {params : params})
    //   .pipe(
    //     map((data) => new Evaluation(data['name'], data['score'], data['assessment'])),
    //     // tap(() => this.log("Coeficients obtained from server: " + this.path)),
    //     tap((result) => console.log(result)),
    //     catchError(this.handleError<Evaluation>('EvaluatorService: evaluate'))
    //   )
    // );

    // return this.http.get<Coeficient[]>(environment.apiUrl + path)
    //   .pipe(
    //     tap(coeficients => this.log("Coeficients obtained from server: " + path)),
    //     catchError(this.handleError<Coeficient[]>('getCoeficients'))
    //   );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    // this.messageService.add('HeroService: ' + message);
    console.log(message)
  }
}
