import { actor, player } from "./actor";

export class statusEffect {
    level: number;
    effect: String;
    constructor(effect: String, level:number) {
        this.level = level;
        this.effect = effect;
    }

    enact(affected: actor){
        switch(this.effect) {
            case "burn" : damage(affected, this.level); break;
            case "poison" : damage(affected, this.level); break;
            case "slow" : lowerDefence(affected, this.level); break;
            case "daze" : lowerDefence(affected, this.level); lowerAccuracy(affected, this.level); break;
            case "boost-defence" : raiseDefence(affected, this.level); break;
            case "boost-accuracy" : raiseAccuracy(affected, this.level); break;
            case "boost" : raiseDefence(affected, this.level); raiseAccuracy(affected, this.level); break;
            default : affected.removeEffect(this); break;
        }
    }
}

var damage = function(affected: actor, level:number) {
    affected.hp -= level;
}

var lowerDefence = function(affected: actor, level:number){
    affected.defence -= level;
    if(affected.defence <= 1) affected.defence = 1;
}

var lowerAccuracy = function(affected: actor, level:number){
    affected.accuracy -= level;
    if(affected.accuracy <= 1) affected.accuracy = 1;
}

var raiseDefence = function(affected: actor, level:number){
    affected.defence += level;
}

var raiseAccuracy = function(affected: actor, level:number){
    affected.accuracy += level;
}

