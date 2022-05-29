import { Injectable } from '@angular/core';
import { SignInData } from 'src/app/model/signInData';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})



export class AuthenticationService {
  
  signinData: SignInData = new SignInData();
  private readonly mockedUser = new SignInData();
  isAuthenticated = false;
  


  constructor(private router: Router) { }

  authenticate(signInData: SignInData): boolean {
    if(this.checkCredentials(signInData)){
      this.isAuthenticated = true;
      this.router.navigate(['home']);
      return true;
    }
    this.isAuthenticated = false;
    return false;
  }

  private checkCredentials(signInData: SignInData): boolean{
    return this.checkUsername(signInData.username) && this.checkPassword(signInData.password);
  }

  private checkUsername(username: string): boolean {
    return username === this.mockedUser.username;
  }

  private checkPassword(password: string): boolean {
return password === this.mockedUser.password;
  }

  logout() {
    this.isAuthenticated = false;
    sessionStorage.clear();
    this.router.navigate(['']);
  }
}
