import { Component, OnInit } from '@angular/core';
import { player } from '../scriptFiles/actor';
import {shop} from '../scriptFiles/shop'
import { Router } from '@angular/router';
import { PlayerService } from '../services/player.service';
import * as getAbilities from "../json/abilities.json";
import { AuthenticationService } from '../service/authentication/authentication.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent extends shop implements OnInit{

  constructor(private router:Router, private playerService:PlayerService,
    public authenticationService:AuthenticationService) {
    super(playerService.getPlayer());
    playerService.reset();
  }

  ngOnInit(): void {
    var abilities = JSON.parse(JSON.stringify(getAbilities));

    for(const skill of abilities.skills) {
      this.addSkill(skill.name, skill.effect, skill.sides, skill.cost, skill.coinCost, skill.selfTargeted);
    }

    for(const spell of abilities.spells) {
      this.addSpell(spell.name, spell.effect, spell.sides, spell.cost, spell.coinCost, spell.selfTargeted);
    }

    for(const item of abilities.items) {
      this.addItem(item.name, item.effect, item.sides, item.stock, item.coinCost, item.selfTargeted);
    }
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

  toBuy(){
    this.router.navigate(['/buy']);
  }
  
  logout() {
    this.authenticationService.logout();
  }
}
