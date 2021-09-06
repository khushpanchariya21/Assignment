import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Movies } from '../models/movies';
import { result } from '../models/movies';
import { catchError, delay, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DataService {
    constructor(
      private http: HttpClient,
      @Inject("API_URL") public API_URL: any
      ) { }

    getAllMovies(page:number):Observable<Movies> {
      // return of().pipe(delay(1000));
        return this.http.get<any>(`${this.API_URL}/api/v1/maya/movies/?page=${page}`).pipe(delay(500));
    }
    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
  
        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead
  
        // TODO: better job of transforming error for user consumption
        console.log(`${operation} failed: ${error.message}`);
  
        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }
    
    // getById(id: number) {
    //     return this.http.get(`${config.apiUrl}/users/${id}`);
    // }

    
}