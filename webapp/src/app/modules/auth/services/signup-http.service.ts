import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';

import { API_URL } from "@constants/constants";

@Injectable({
  providedIn: 'any'
})
export class SignupHttpService {

  private httpClient = inject(HttpClient);

  register(data: { username: string, email: string, password: string }): Observable<any> {
    return this.httpClient.post(`${API_URL}/user/register`, data);
  }

  countEmail(data:{email:string}) {
    return this.httpClient.post(`${API_URL}/user/email-count`, data);
  }

}
