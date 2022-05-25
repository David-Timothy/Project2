import {action, playerAction, item} from "/webpage/javascript/action.js";
import {statusEffect} from "/webpage/javascript/statusEffect.js";

class actor {
    constructor(name, hp, accuracy, defence){
        this.name = name;
        this.setHealth(hp);
        this.setAccuracy(accuracy);
        this.setDefence(defence);
        this.statusEffects = [];
        this.immunities = [];
    }

    addEffect(effect, level){
        for(const immunity of this.immunities) {
            if(immunity == effect)
                return this.name+" is immune to "+immunity;
        }
        if(effect != "none") {
            var affected = false;
            for(const statEffect of this.statusEffects){
                if(statEffect.effect == effect){
                    statEffect.level+=level;
                    affected = true

                }
            }
            if(!affected)
                this.statusEffects.push(new statusEffect(effect, level));
            return this.name + " received : "+ effect+"-"+level;
        }
        if(effect == "none"){
            return "";
        }
    }

    removeEffect(effect) {
        this.statusEffects.splice(this.statusEffects.indexOf(effect), 1);
    }

    turn() {
        this.defence = this.defenceMax;
        this.accuracy = this.accuracyMax;
        for (let i = 0; i < this.statusEffects.length; i++) {
            var effect = this.statusEffects[i];
            effect.enact(this);
            effect.level--;
            if(effect.level == 0) this.removeEffect(effect);
        }
    }
    setHealth(hp){
        this.hp = hp;
        this.hpMax = hp;
    }
    setAccuracy(acc){
        this.accuracy = acc;
        this.accuracyMax = acc;
    }
    setDefence(def){
        this.defence = def;
        this.defenceMax = def;
    }
}

export class monster extends actor {
    constructor(name, hp, accuracy, defence, image, coinReward) {
        super(name, hp, accuracy, defence);
        this.imagePath = image;
        this.abilities = [];
        this.coinReward = coinReward;
    }

    addAbility(name, effect, sides) {
        var monsterAction = new action(name, effect, sides);
        monsterAction.level = Math.ceil(this.coinReward*0.5);
        this.abilities.push(monsterAction);
    }
}

export class player extends actor {

        constructor(hp, mana, energy) {
            super("You", hp, 10, 10);
            this.setMana(mana);
            this.setEnergy(energy);
            this.skills = [];
            this.spells = [];
            this.inventory = [];
        }

        setMana(mana) {
            this.mana = mana;
            this.manaMax = mana;
        }

        setEnergy(energy) {
            this.energy = energy;
            this.energyMax = energy;
        }

        addSkill(name, effect, sides, cost) {
            this.skills.push(new playerAction(name, effect, sides, "energy", cost, this));
        }

        addSpell(name, effect, sides, cost) {
           this.spells.push(new playerAction(name, effect, sides, "mana", cost, this));
        }

        addItem(name, effect, sides, stock) {
            this.inventory.push(new item(name, effect, sides, this, stock));
        }

        addShopSkill(shopItem) {
            shopItem.storedAction.level = shopItem.buying;
            this.skills.push(shopItem.storedAction);
        }

        addShopSpell(shopItem) {;
            shopItem.storedAction.level = shopItem.buying;
            this.spells.push(shopItem.storedAction);
        }

        addShopItem(shopItem) {
            if(shopItem.storedAction.stock > -1)
                shopItem.storedAction.stock = shopItem.buying;
            else
                shopItem.storedAction.level = shopItem.buying;
            this.inventory.push(shopItem.storedAction);
        }

        addFromShop(shopItem) {
            if(shopItem.buying > 0){
                if(shopItem.storedAction.source=="item")
                    this.addShopItem(shopItem);
                if(shopItem.storedAction.source=="mana")
                    this.addShopSpell(shopItem);
                if(shopItem.storedAction.source=="energy")
                    this.addShopSkill(shopItem);
            }
        }
}