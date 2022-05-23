import { Component, OnInit } from '@angular/core';
import { action, playerAction } from '../scriptFiles/action';
import { actor, monster, player } from '../scriptFiles/actor';
import { die } from '../scriptFiles/die';
import {pickMonster} from '../scriptFiles/genMonster';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {
  difficulty:number = 0;
  inBattle: boolean = false;
  monster!:monster;
  player:player;

  constructor() {
    this.selectMonster();
    this.player = new player(100,10,10);
    this.getPlayerSkills(this.player);
   }

  ngOnInit(): void {
    
  }

  acceptBattle(){
    console.log("accept");
    this.inBattle = true;
  }

  selectMonster() {
    console.log("select");
    this.difficulty++;
    this.monster = pickMonster(this.difficulty);
  }

  win(){
    alert("Defated "+monster.name);
    this.inBattle = false;
    this.selectMonster();
  }

  lose(){
    alert("You fainted");
    this.inBattle = false;
  }

  getPlayerSkills(player:player) {
    player.addSkill("Kick", "daze", 4, 1, false);
    player.addSkill("Give up", "none", 1000, 0, true);

    player.addSpell("Fireball", "burn", 8, 2, false);

    player.addItem("Sword", "none", 6, -1, false);
  }

  doAction(action:playerAction) {
    if(action.canCast()){
      this.playerTurn(action);
      if(this.monster.hp <= 0)
        this.win();
      else
        this.monsterTurn();
    }
  }

  monsterTurn(){
    this.monster.turn();
    var action = this.monster.abilities[die(this.monster.abilities.length)-1];
    if(action.selfTargeted){
      alert(action.preform(this.monster));
    } else {
      alert(action.preform(this.player));
      if(this.player.hp <= 0)
        this.lose();
    }
  }

  playerTurn(action:playerAction){
    this.player.turn();
    if(action.selfTargeted)
      alert(action.preform(this.player));
    else
      if(willHit(this.player, this.monster))
        alert(action.preform(this.monster));
      else
        alert("You missed");
  }

}

function willHit(castor:actor, target:actor) {
  return die(castor.accuracy) >= die(target.defence);
}