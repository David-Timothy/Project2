import { Component, OnInit } from '@angular/core';
import { monster } from '../scriptFiles/actor';
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

  constructor() {
    this.selectMonster();
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

  }

  lose(){
    
  }

}

