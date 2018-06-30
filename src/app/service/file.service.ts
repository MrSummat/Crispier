import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { SequenceError } from '../model/sequenceError';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  path: string = "/contribute";

  constructor(private http: HttpClient) { }

  postFile(fileToUpload: File): Observable<SequenceError[]> {
    const endpoint = environment.apiUrl + "/contribute";

    const formData: FormData = new FormData();
    formData.append('contribution', fileToUpload, fileToUpload.name);

    return this.http
      .post<SequenceError[]>(endpoint, formData).pipe(
        map((data) => {
          let result: string = data['result'];
          let fileErrors: Object[] = data['errors'];

          if (result.toLocaleLowerCase() == "success")
            return [];

          let errors: SequenceError[] = [];
          for (const error of fileErrors) {
            errors.push(new SequenceError(fileToUpload.name, error["row"], error["error"]))
          }

          return errors;
        }),
        catchError(this.handleError('postFile'))
      );
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
