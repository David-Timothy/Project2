import { Component, OnInit } from '@angular/core';
import { Request } from '../request';
import { RequestService } from '../services/request.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  requests!:Request[];

  constructor(private requestService: RequestService) { }

  ngOnInit(): void {
    this.getAllPurchases();
  }

  getAllPurchases() {

  // const id = Number(this.route.snapshot.paramMap.get('id'));

    const id = 1;
    this.requestService.getAllPurchases(id).subscribe((requests:Request[]) => {
      this.requests = requests;
    })
  }

  requestRefund(request:Request) {
    this.requestService.requestRefund(request).subscribe(
      request => {
       alert(`You requested a refund for the purchase with an ID of ${request.id}`)
      }
     )
  }

}
