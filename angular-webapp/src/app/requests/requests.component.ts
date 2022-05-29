import { Component, OnInit } from '@angular/core';
import { Request } from '../request';
import { RequestService } from '../services/request.service';
import { CharactersService } from '../services/characters.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  requests!:Request[];
  charId!: Number;

  constructor(private requestService: RequestService, private charService:CharactersService) { }

  ngOnInit(): void {
    this.charId = this.charService.getCharacter().id;
    this.getAllPurchases();
  }

  getAllPurchases() {

  // const id = Number(this.route.snapshot.paramMap.get('id'));

    this.requestService.getAllPurchases(this.charId).subscribe((requests:Request[]) => {
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
