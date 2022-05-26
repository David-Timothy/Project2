import { Component, OnInit } from '@angular/core';
import { SignInData } from '../model/signInData';
import { DataService } from '../data.service';

@Component({
  selector: 'app-update-username-password',
  templateUrl: './update-username-password.component.html',
  styleUrls: ['./update-username-password.component.css']
})
export class UpdateUsernamePasswordComponent implements OnInit {

  signinData: SignInData = new SignInData();

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }
  usernameUpdate(){
    
    // console.log(this.signinData);
    this.dataService.updateUsername(this.signinData).subscribe(data=>{
      if(data){
        alert("Username Updated Successfully!");
      } else {
       alert("Uh Oh Something Went Wrong!");
      }
      // console.log(data);
    }
    )
  }

  passwordUpdate(){
    
    // console.log(this.signinData);
    this.dataService.updatePassword(this.signinData).subscribe(data=>{
      if(data){
        alert("Password Updated Successfully!");
      } else {
       alert("Uh Oh Something Went Wrong!");
      }
    }
    )
  }
}