import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { Character } from '../entity/character';

@Component({
  selector: 'app-admin-manage',
  templateUrl: './admin-manage.component.html',
  styleUrls: ['./admin-manage.component.css']
})
export class AdminManageComponent implements OnInit {

  char!:Character;
  constructor(private adminService:AdminService,
    private route:ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
    this.getCharacterById();
  }

  getCharacterById() {
    const id=Number (this.route.snapshot.paramMap.get('id'));
    this.adminService.getCharacterById(id).subscribe(
      char => {this.char=char;}
    )
  }

  deleteCharacter() {
    this.adminService.deleteCharacter(this.char.id).subscribe();
    alert('Character Deleted Successfully!')
    // after deleting, the page navigate to another path.
    this.router.navigate(['/adminhome']);

  }

  deleteAccount() {
    this.adminService.deleteAccount(this.char.account_id).subscribe();
    alert('Account Deleted Successfully!')
    this.router.navigate(['/adminhome']);

  }
}
