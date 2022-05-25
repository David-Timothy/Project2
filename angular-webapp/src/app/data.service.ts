import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError} from 'rxjs/operators';
import { SignInData } from './model/signInData';
import { Router } from '@angular/router';

// import { sign } from 'crypto';



@Injectable({
  providedIn: 'root'
})
export class DataService {

  

  private baseUrl='http://localhost:9001/account/login';

  constructor(private httpClient: HttpClient) { }

loginuser(signInData: SignInData): Observable<object>{;
  console.log(signInData);
  return this.httpClient.post(`http://localhost:9001/account/login`, signInData);
}

updateUsername(signInData: SignInData): Observable<object> {
  
  console.log(signInData);
  return this.httpClient.put(`http://localhost:9001/account/update/${signInData.id}`, signInData.username);

}

updatePassword(signInData: SignInData): Observable<object> {
  console.log(signInData);
  return this.httpClient.put(`http://localhost:9001/account/login/${signInData.id}`, signInData.password);

}

}
