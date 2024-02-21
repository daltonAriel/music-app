import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { API_URL } from "@constants/constants";

@Injectable({
  providedIn: 'any'
})
export class LoginHttpService {

  private httpClient = inject(HttpClient);

  login(data:{email:string, password:string}){
    return this.httpClient.post(`${API_URL}/user/register`,data);
  }

}
