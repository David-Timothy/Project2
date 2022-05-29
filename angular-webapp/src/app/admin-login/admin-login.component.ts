import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
// import { sign } from 'crypto';
import { SignInData } from '../model/signInData';
import { AuthenticationService } from '../service/authentication/authentication.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AdminService } from '../admin.service';
import { Account } from '../entity/account';
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  
  
  signinData: SignInData = new SignInData();
  isFormInvalid = false;
  areCredentialsValid = false;
 

  constructor(private adminService: AdminService, private route:ActivatedRoute, 
    private router:Router, 
    private authenticatedService:AuthenticationService) { }

  
  
  ngOnInit(): void {
  }
//added bc

adminLogin(){
    
  // console.log(this.signinData);
  this.adminService.loginAdmin(this.signinData).subscribe((account:Account) =>{
    if(account.id != null){
      sessionStorage.setItem('id', <string> <unknown> account.id);
      this.authenticatedService.isAuthenticated = true;
     this.router.navigate(['/adminhome']);
     alert("Login Successfully!");
   } else {
     this.areCredentialsValid = true
      alert("Please enter correct username and password");
   }
   // console.log(data);
    
  }
  
  )
}


}

