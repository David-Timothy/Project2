import { Component, OnInit } from '@angular/core';
import { RequestService } from '../services/request.service';
import { Request } from '../request';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-handle-request',
  templateUrl: './admin-handle-request.component.html',
  styleUrls: ['./admin-handle-request.component.css']
})
export class AdminHandleRequestComponent implements OnInit {
  refundsRequested!:Request[];

  constructor(private requestService: RequestService) { }

  ngOnInit(): void {
    this.getAllRequestedRefunds();
  }

  handleRequest(request:Request, status:string) {
    console.log(status);
    request.status = status;
    console.log(request.status);
    this.requestService.handleRequest(request, status).subscribe(
      request => {
       alert(`Your decision for the refund request with an ID of ${request.id} is - ${request.status}`)
      })
  }

  getAllRequestedRefunds() {
    this.requestService.getAllRequestedRefunds().subscribe((requests:Request[]) => {
      this.refundsRequested = requests;
    })
  }


}
