import {multiDie} from "./die";
import { statusEffect } from "./statusEffect";
import { actor, player } from "./actor";

export class action {
    name: String;
    effect: string;
    sides: number;
    level: number;
    selfTargeted: boolean;
    constructor(name: String, effect: string, sides: number, selfTargeted:boolean) {
        this.name = name;
        this.effect = effect;
        this.sides = sides;
        this.selfTargeted = selfTargeted;
        this.level = 1;
    }

    preform(target:actor) {
        var dmg = multiDie(this.level, this.sides);
        target.hp = target.hp - dmg;
        if(target.hp < 0) target.hp = 0;
        if(target.hp > target.hpMax) target.hp = target.hpMax;

        return target.name+" hp : "+(-dmg)+"\n"+target.addEffect(this.effect, this.level);
    }
}

export class playerAction extends action {
    source: string;
    cost: number;
    player: player;
    constructor(name:string, effect:string, sides:number, source:string, cost:number, player:player, selfTargeted:boolean) {
        super(name, effect, sides, selfTargeted);
        this.source = source;
        this.cost = cost;
        this.player = player;
    }

    override preform(target:actor) {
        if(this.source == "mana")
            this.player.mana = this.player.mana-this.cost;
        if(this.source == "energy")
            this.player.energy = this.player.energy-this.cost;
        return super.preform(target);
    }

    canCast() {
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
        return false;
    }
}

export class item extends playerAction {
    stock: number;
    constructor(name:string, effect:string, sides:number, player:player, stock:number, selfTargeted:boolean) {
        super(name, effect, sides, "item", 0, player, selfTargeted);
        this.stock = stock;
    }

    override preform(target:actor) {
        if(this.stock > 0)
            this.stock = this.stock-1;
        return super.preform(target);
    }

    override canCast() {
        return this.stock != 0;
    }
}