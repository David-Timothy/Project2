import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
// import { sign } from 'crypto';
import { SignInData } from '../model/signInData';
import { AuthenticationService } from '../service/authentication/authentication.service';
import { DataService } from '../data.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Account } from '../entity/account';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  
  signinData: SignInData = new SignInData();
  isFormInvalid = false;
  areCredentialsValid = false;
 

  constructor(private dataService: DataService, private route:ActivatedRoute, 
    private router:Router, 
    private authenticatedService:AuthenticationService) { }

  
  
  ngOnInit(): void {
  }
//added bc

userLogin(){
    // console.log(this.signinData);
  this.dataService.loginuser(this.signinData).subscribe((account:Account)=>{
    console.log(account)
    if(account.id !== null){
      sessionStorage.setItem('id', <string> <unknown> account.id);
      this.authenticatedService.isAuthenticated = true;
      this.router.navigate(['/characters']);
      alert("Login Successfully!");
    } else {
      this.areCredentialsValid = true
  alert("Please enter correct username and password");
    }
    // console.log(data);
    
  }
  
  )
}
////



  // onSubmit(signInForm: NgForm){
  //   if(!signInForm.valid){
  //     this.isFormInvalid = true;
  //     this.areCredentialsValid = false;
  //     return;
  //   }
  //   this.checkCredentials(signInForm);
  //   console.log(signInForm.value);
    
    
  // }

  // private checkCredentials(signInForm: NgForm){
  //   const signInData = new SignInData(signInForm.value.username, signInForm.value.password);
  //   if(!this.authenticationService.authenticate(signInData)){
  //     this.isFormInvalid = false;
  //     this.areCredentialsValid = true;
  //   }
  // }

}
