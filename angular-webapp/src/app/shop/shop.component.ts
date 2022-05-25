import { Component, OnInit } from '@angular/core';
import { player } from '../scriptFiles/actor';
import {shop} from '../scriptFiles/shop'
import { Router } from '@angular/router';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent extends shop implements OnInit{

  constructor(private router:Router, private playerService:PlayerService) {
    super(playerService.getPlayer());
    playerService.reset();
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
    return this.playerService.getPlayer().coins;
  }

  purchaseItems(): void {
    if(this.totalCost() <= this.getCoins()) {
      for(let item of this.items){
        this.playerService.addFromShop(item);
      }
      this.playerService.changeMax(this.hpBoost, this.manaBoost, this.energyBoost, this.accuracyBoost, this.defenceBoost);
      this.playerService.changeCoins(-this.totalCost());
      this.router.navigate(['/battle']);
    } else
      console.log("not enough coins");
  }

}
