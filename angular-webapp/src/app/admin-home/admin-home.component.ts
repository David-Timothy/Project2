import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Character } from '../entity/character';
import { AuthenticationService } from '../service/authentication/authentication.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  characters!:Character[];
  constructor(private adminService:AdminService,
    public authenticationService:AuthenticationService) { }

  ngOnInit(): void {
    this.getAllCharacter();
  }

  getAllCharacter() {
    this.adminService.getAllCharacter().subscribe(
      (char:Character[]) => {this.characters = char} 
    )
  }
  logout() {
    this.authenticationService.logout();
  }
}
