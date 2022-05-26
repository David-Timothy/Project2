import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Character } from '../entity/character';


@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  characters!:Character[];
  constructor(private adminService:AdminService) { }

  ngOnInit(): void {
    this.getAllCharacter();
  }

  getAllCharacter() {
    this.adminService.getAllCharacter().subscribe(
      (char:Character[]) => {this.characters = char} 
    )
  }

}
