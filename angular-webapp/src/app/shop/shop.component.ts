import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  items: Array<shopItem> = [];
  hpBoost: number = 0;
  accuracyBoost: number = 0;
  defenceBoost: number = 0;
  manaBoost: number = 0;
  energyBoost: number = 0;

  constructor() {
  }

  ngOnInit(): void {
    this.addSkill("Evade", "boost-defence", 0, 1, 1);

    this.addSpell("Firebolt", "burn", 8, 2, 2);
    this.addSpell("Freeze", "slow", 6, 2, 1);
    this.addSpell("Confuse", "daze", 0, 1, 2);

    this.addItem("Sword", "none", 6, -1, 4);
    this.addItem("Bomb", "none", 10, 0, 4);
    this.addItem("Health Potion", "heal", -10, 0, 1);
  }
  addItem(name: string, effect: string, sides: number, cost: number, coins: number) {
    this.items.push(new shopItem(name, 2));
  }
  addSpell(name: string, effect: string, sides: number, cost: number, coins: number) {
    this.items.push(new shopItem(name, 2))
  }
  addSkill(name: string, effect: string, sides: number, cost: number, coins: number) {
    this.items.push(new shopItem(name, 2))
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

  totalCost() {
    var cost = 0;
        for(var i = 0; i < this.items.length; i++) {
            cost += this.items[i].totalCost();
        }
        cost += this.hpBoost/10;
        cost += this.accuracyBoost;
        cost += this.defenceBoost;
        cost += this.manaBoost;
        cost += this.energyBoost;
        return cost;
  }

}

class shopItem {
  buying: number;
  name: String;
  coinCost: number;

  constructor(name: String, coinCost: number){
      this.buying = 0;
      this.name = name;
      this.coinCost = coinCost;
  }

  totalCost() {
      return this.buying*this.coinCost;
  }
}