import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { action, playerAction } from '../scriptFiles/action';
import { actor, monster, player } from '../scriptFiles/actor';
import { die } from '../scriptFiles/die';
import {pickMonster} from '../scriptFiles/genMonster';
import { PlayerService } from '../services/player.service';

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

  constructor(private router:Router, private playerService:PlayerService) {
    this.selectMonster();
    this.player = this.playerService.getPlayer();
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
    this.playerService.changeCoins(this.difficulty);
    this.playerService.earnAchievment("Victory!", "Win a single battle");
    this.selectMonster();
  }

  lose(){
    alert("You fainted");
    this.router.navigate(['/shop']);
  }

  getPlayerSkills(player:player) {
    player.addSkill("Kick", "daze", 4, 1, false);
    player.addSkill("Give up", "none", 1000, 0, true);
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
    if(action.selfTargeted) {
      alert(action.preform(this.player));
    } else
      if(willHit(this.player, this.monster))
        alert(action.preform(this.monster));
      else
        alert("You missed");
  }

}

function willHit(castor:actor, target:actor) {
  return die(castor.accuracy) >= die(target.defence);
}