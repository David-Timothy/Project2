import { Component, OnInit } from '@angular/core';
import {pickMonster} from '../scriptFiles/genMonster.js';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {
  inBattle: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  acceptBattle(){
    this.inBattle = true;
  }

  win(){

  }

  lose(){
    
  }

}

