import { Component, OnInit } from '@angular/core';
import { player } from '../scriptFiles/actor';
import {shop} from '../scriptFiles/shop'

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent extends shop implements OnInit{

  constructor() {
    super(new player(100, 10, 10));
  }

  ngOnInit(): void {
    this.addSkill("Evade", "boost-defence", 0, 1, 1, true);

    this.addSpell("Firebolt", "burn", 8, 2, 2, false);
    this.addSpell("Freeze", "slow", 6, 2, 1, false);
    this.addSpell("Confuse", "daze", 0, 1, 2, false);

    this.addItem("Sword", "none", 6, -1, 4, false);
    this.addItem("Bomb", "none", 10, 0, 4, false);
    this.addItem("Health Potion", "heal", -10, 0, 1, true);
  }

  getCoins(): number {
    return 10;
  }

  purchaseItems(): void {
    if(this.totalCost() <= this.getCoins())
      console.log("purchased");
    else
      console.log("not enough coins");
  }

}
