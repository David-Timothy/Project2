import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError} from 'rxjs/operators';
import { SignInData } from './model/signInData';
import { Router } from '@angular/router';
import { Account } from './entity/account';

// import { sign } from 'crypto';



@Injectable({
  providedIn: 'root'
})
export class DataService {

  

  private baseUrl='http://localhost:9001/account/login';

  constructor(private httpClient: HttpClient) { }

loginuser(signInData: SignInData){;
  console.log(signInData);
  return this.httpClient.post<Account>(`http://localhost:9001/account/login`, signInData);
}

updateUsername(signInData: SignInData): Observable<object> {
  
  console.log(signInData);
  return this.httpClient.put(`http://localhost:9001/account/update/${sessionStorage.getItem("id")}`, signInData);

}

updatePassword(signInData: SignInData): Observable<object> {
  console.log(signInData);
  return this.httpClient.put(`http://localhost:9001/account/update-password/${sessionStorage.getItem("id")}`, signInData);

}

}