import { Injectable } from '@angular/core';
import { Character } from '../character';
import { player } from '../scriptFiles/actor';
import { run } from '../scriptFiles/run';
import { shopItem } from '../scriptFiles/shop';
import { AchievmentService } from './achievment.service';
import { CharactersService } from './characters.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  player:player;
  char!:Character;

  constructor(private charactersService:CharactersService, private achievmentService:AchievmentService) { 
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
      this.player.addSkill("Kick", "daze", 4, 1, false);
      this.player.addSkill("Give up", "none", 1000, 0, true);
    }
    return this.player;
  }

  reset() {
    var initRun = new runImpl();
    this.player.setHealth(initRun.healthmax);
    this.player.setMana(initRun.manamax);
    this.player.setEnergy(initRun.energymax);
    this.player.setAccuracy(10);
    this.player.setDefence(10);
    this.player.statusEffects = [];

    this.player.skills = [];
    this.player.spells = [];
    this.player.inventory = [];
    this.player.addSkill("Kick", "daze", 4, 1, false);
    this.player.addSkill("Give up", "none", 1000, 0, true);

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

  earnAchievment(name:string, description:string) {
    this.achievmentService.earnAchievment(name, description, Number(this.char.id));
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