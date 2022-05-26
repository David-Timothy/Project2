import { Component, OnInit } from '@angular/core';
import { RequestService } from '../services/request.service';
import { CharactersService } from '../services/characters.service';
import { Request } from '../request';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buy-coins',
  templateUrl: './buy-coins.component.html',
  styleUrls: ['./buy-coins.component.css']
})
export class BuyCoinsComponent implements OnInit {
  request!: Partial<Request>;
  charId!: Number;

  constructor(private requestService:RequestService, private charService:CharactersService, private router:Router) { }

  ngOnInit(): void {
    this.charId = this.charService.getCharacter().id;
    this.request = {
      charId: this.charId,
      amount: 0,
      status: 'pending'
    }
  }

  buyCoins() {
     this.requestService.buyCoins(this.request).subscribe(
      request => {
       alert(`Your purchase of ${request.amount} of coins is pending`)
      }
     )
  }

  backToTheShop(){
    this.router.navigate(['/shop']);
  }

}
