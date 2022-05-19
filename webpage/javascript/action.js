import {die, multiDie} from "/webpage/javascript/die.js";
import {statusEffect} from "/webpage/javascript/statusEffect.js";

export class action {
    constructor(name, effect, sides) {
        this.name = name;
        this.effect = effect;
        this.sides = sides;
        this.level = 1;
    }

    preform(target) {
        var dmg = multiDie(this.level, this.sides);
        target.hp = target.hp - dmg;
        if(target.hp < 0) target.hp = 0;
        if(target.hp > target.hpMax) target.hp = target.hpMax;

        return target.name+" hp : "+(-dmg)+"\n"+target.addEffect(this.effect, this.level);
    }
}

export class playerAction extends action {
    constructor(name, effect, sides, source, cost, player) {
        super(name, effect, sides);
        this.source = source;
        this.cost = cost;
        this.player = player;
    }

    preform(target) {
        if(this.source == "mana")
            this.player.mana = this.player.mana-this.cost;
        if(this.source == "energy")
            this.player.energy = this.player.energy-this.cost;
        return super.preform(target);
    }

    canCast(castor) {
        if(this.source == "mana") {
            if(this.player.mana < this.cost)
                alert("You do not have enough mana");
            return this.player.mana >= this.cost;
        }
        if(this.source == "energy"){
            if(this.player.energy < this.cost)
                alert("You do not have enough energy");
            return this.player.energy >= this.cost;
        }
    }
}

export class item extends playerAction {
    constructor(name, effect, sides, player, stock) {
        super(name, effect, sides, "item", 0, player);
        this.stock = stock;
    }

    preform(target) {
        if(this.stock > 0)
            this.stock = this.stock-1;
        return super.preform(target);
    }

    canCast(castor) {
        return this.stock != 0;
    }
}