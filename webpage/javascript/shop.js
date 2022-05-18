import {action, playerAction, item} from "/webpage/javascript/action.js";

class shopItem {
    constructor(storedAction, coinCost){
        this.buying = 0;
        this.storedAction = storedAction;
        this.coinCost = coinCost;
    }

    totalCost() {
        return this.buying*this.coinCost;
    }
}

export class shop {
    constructor(thisPlayer) {
        this.items = [];
        this.thisPlayer = thisPlayer;
    }

    addSkill(name, effect, sides, cost, coinCost) {
        this.items.push(new shopItem(
            new playerAction(name, effect, sides, "energy", cost, this.thisPlayer),
            coinCost)
        );
    }

    addSpell(name, effect, sides, cost, coinCost) {
        this.items.push(new shopItem(
            new playerAction(name, effect, sides, "mana", cost, this.thisPlayer),
            coinCost)
        );
    }

    addItem(name, effect, sides, stock, coinCost) {
        this.items.push(new shopItem(
            new item(name, effect, sides, this.thisPlayer, stock),
            coinCost)
        );
    }

    purchase(player) {
        for(var i = 0; i < this.items.length; i++) {
            player.addFromShop(this.items[i]);
        }
    }

    totalCost() {
        var cost = 0;
        for(var i = 0; i < this.items.length; i++) {
            cost += this.items[i].totalCost();
        }
        return cost;
    }
}