import { Injectable } from '@angular/core';
import { player } from '../scriptFiles/actor';
import { run } from '../scriptFiles/run';
import { shopItem } from '../scriptFiles/shop';
import { CharactersService } from './characters.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  player:player;

  constructor(private charactersService:CharactersService) { 
    this.player = this.getPlayer();
  }

  getPlayer(): player{
    if(!this.player) {
      var character = this.charactersService.getCharacter();
      var run = this.getRun();
      this.player = new player(run.healthmax, run.manamax, run.energymax);
      this.player.hp = run.health;
      this.player.mana = run.mana;
      this.player.energy = run.energy;
      this.player.name = ""+character.name;
      this.player.coins = character.coins.valueOf();
      this.player.progress = run.progress;
    }
    return this.player;
  }

  addFromShop(item:shopItem){
    this.player.addFromShop(item);
  }

  getRun(){
    return new runImpl()
  }
}

class runImpl implements run{
  id: number = 1;
  char_id: number = 1;
  mana: number = 10;
  energy: number = 10;
  health: number = 10;
  manamax: number = 10;
  energymax: number = 10;
  healthmax: number = 10;
  progress: number =1;
}