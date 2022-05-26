import { Component, OnInit } from '@angular/core';
import { Request } from '../request';
import { RequestService } from '../services/request.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-assign-coins',
  templateUrl: './admin-assign-coins.component.html',
  styleUrls: ['./admin-assign-coins.component.css']
})
export class AdminAssignCoinsComponent implements OnInit {
  pendingRequests!:Request[];

  constructor(private requestService: RequestService, private router:Router) { }

  ngOnInit(): void {
    this.getAllPendingRequests();
  }

  getAllPendingRequests() {
      this.requestService.getAllPendingRequests().subscribe((requests:Request[]) => {
        this.pendingRequests = requests;
      })
    }

  assignCoins(request:Request) {
    this.requestService.assignCoins(request).subscribe(
      request => {
       alert(`Your succesfully assigned ${request.amount} coins to character with an ID of ${request.charId}`)
      })
  }

  backToHome(){
    this.router.navigate(['/adminhome']);
  }
}
