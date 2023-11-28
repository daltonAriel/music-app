import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

import { API_URL } from "@constants/constants";
import { TokenInterface } from "@interfaces/tokenInterface";



@Injectable({
  providedIn: 'any'
})
export class HttpLoginService {

  constructor(private http: HttpClient) {

  }

  getAccessToken(): Observable<TokenInterface> {
    return this.http.post<TokenInterface>(API_URL + '/user/login', { "email": "dalton@gmail.com", "password": "123451" })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 400) {
      console.log('Error:', error.error);

    } else if (error.status === 401) {
      console.log(error.error);
    } else if (error.status === 403) {
      console.log(error.error);
    } else if (error.status === 404) {
      console.log(error.error);
    } else if (error.status === 500) {
      console.log(error.error);
    } else {
      console.log('Error', error);
    }

    return throwError(()=>error)
  }

}
