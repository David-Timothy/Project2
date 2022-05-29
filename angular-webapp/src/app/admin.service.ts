import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError} from 'rxjs/operators';
import { SignInData } from './model/signInData';
import { Router } from '@angular/router';
import { Account } from './entity/account';
import { Character } from './entity/character';
// import { sign } from 'crypto';



@Injectable({
  providedIn: 'root'
})
export class AdminService{
  constructor(private httpClient: HttpClient) { }

loginAdmin(signInData: SignInData){;
  console.log(signInData);
  return this.httpClient.post<Account>(`http://localhost:9001/admin/login`, signInData);
}

getCharacterById(id:Number) {
  return this.httpClient.get<Character>(`http://localhost:9001/admin/char/${id}`);
}

getAllCharacter() {
  return this.httpClient.get<Character[]>('http://localhost:9001/admin/allchar');
}

deleteCharacter(id: Number) {
  return this.httpClient.delete(`http://localhost:9001/admin/char/${id}`);
}

deleteAccount(account_id:Number) {
  return this.httpClient.delete(`http://localhost:9001/admin/account/${account_id}`)
}
}