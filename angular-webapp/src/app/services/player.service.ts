import { Injectable } from '@angular/core';
import { Character } from '../character';
import { player } from '../scriptFiles/actor';
import { run } from '../scriptFiles/run';
import { shopItem } from '../scriptFiles/shop';
import { CharactersService } from './characters.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  player:player;
  char!:Character;

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
      this.char = character;
    }
    return this.player;
  }

  changeCoins(change:number){
    this.char.coins = this.char.coins.valueOf()+change;
    this.getPlayer().coins = this.char.coins.valueOf();
    this.charactersService.updateCoins(this.char).subscribe(()=>{});
  }

  addFromShop(item:shopItem){
    this.player.addFromShop(item);
  }

  getRun(){
    return new runImpl()
  }

  changeMax(hp: number, mana: number, energy: number, accuracy: number, defence: number){
    var p = this.player;
    this.player.setHealth(p.hp+hp);
    this.player.setMana(p.mana+mana);
    this.player.setEnergy(p.energy+energy);
    this.player.setAccuracy(p.accuracy+accuracy);
    this.player.setDefence(p.defence+defence);
  }
}

class runImpl implements run{
  id: number = 1;
  char_id: number = 1;
  mana: number = 10;
  energy: number = 10;
  health: number = 100;
  manamax: number = 10;
  energymax: number = 10;
  healthmax: number = 100;
  progress: number =1;
}