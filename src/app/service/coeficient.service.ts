import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { catchError, map, tap } from 'rxjs/operators';
import { Coeficient } from '../model/coeficient';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoeficientService {

  constructor(private http: HttpClient) { }

  getCoeficients(path: string): Observable<Coeficient[]> {
    return this.http.get<Coeficient[]>(environment.apiUrl + path)
      .pipe(
        tap(coeficients => this.log("Coeficients obtained from server: " + path)),
        catchError(this.handleError<Coeficient[]>('getCoeficients'))
      );
  }

/**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
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