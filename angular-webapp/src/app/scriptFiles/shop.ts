import {playerAction, item} from "./action";
import {player} from "./actor";
import { statusEffect } from "./statusEffect";

export class shopItem {
    storedAction:playerAction;
    buying: number;
    coinCost:number;
    constructor(storedAction: playerAction, coinCost:number){
        this.buying = 0;
        this.storedAction = storedAction;
        this.coinCost = coinCost;
    }

    totalCost() {
        return this.buying*this.coinCost;
    }
}

export class shop {
    items: shopItem[];
    thisPlayer: player;
    hpBoost: number;
    accuracyBoost: number;
    defenceBoost: number;
    manaBoost: number;
    energyBoost: number;
    constructor(thisPlayer:player) {
        this.items = [];
        this.thisPlayer = thisPlayer;
        this.hpBoost = 0;
        this.accuracyBoost = 0;
        this.defenceBoost = 0;
        this.manaBoost = 0;
        this.energyBoost = 0;
    }

    addSkill(name:string, effect:string, sides:number, cost:number, coinCost:number, selfTargeted:boolean) {
        this.items.push(new shopItem(
            new playerAction(name, effect, sides, "energy", cost, this.thisPlayer, selfTargeted),
            coinCost)
        );
    }

    addSpell(name:string, effect:string, sides:number, cost:number, coinCost:number, selfTargeted:boolean) {
        this.items.push(new shopItem(
            new playerAction(name, effect, sides, "mana", cost, this.thisPlayer, selfTargeted),
            coinCost)
        );
    }

    addItem(name:string, effect:string, sides:number, stock:number, coinCost:number, selfTargeted:boolean) {
        this.items.push(new shopItem(
            new item(name, effect, sides, this.thisPlayer, stock, selfTargeted),
            coinCost)
        );
    }

    purchase(player:player) {
        for(var i = 0; i < this.items.length; i++) {
            player.addFromShop(this.items[i]);
        }
        player.setHealth(player.hp+this.hpBoost);
        player.setAccuracy(player.accuracy+this.accuracyBoost);
        player.setDefence(player.defence+this.defenceBoost);
        player.setMana(player.mana+this.manaBoost);
        player.setEnergy(player.energy+this.energyBoost);
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