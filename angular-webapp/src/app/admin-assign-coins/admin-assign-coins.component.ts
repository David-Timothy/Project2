import { Component, OnInit } from '@angular/core';
import { Request } from '../request';
import { RequestService } from '../services/request.service';

@Component({
  selector: 'app-admin-assign-coins',
  templateUrl: './admin-assign-coins.component.html',
  styleUrls: ['./admin-assign-coins.component.css']
})
export class AdminAssignCoinsComponent implements OnInit {
  pendingRequests!:Request[];

  constructor(private requestService: RequestService) { }

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
}
