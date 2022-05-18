import {action, playerAction, item} from "/webpage/javascript/action.js";

class actor {
    constructor(name, hp, accuracy, defence){
        this.name = name;
        this.hp = hp;
        this.hpMax = hp;
        this.accuracy = accuracy;
        this.accuracyMax = accuracy;
        this.defence = defence;
        this.defenceMax = defence;
        this.statusEffects = [];
    }

    turn() {
        this.defence = this.defenceMax;
        this.accuracy = this.accuracyMax;
        var done = [];
        for (let i = 0; i < this.statusEffects.length; i++) {
            if(done.indexOf(this.statusEffects[i]) == -1 && this.statusEffects[i] != null) {
              done.push(this.statusEffects[i]);
              switch (this.statusEffects[i].effect) {
                case "burn" : this.hp -= this.statusEffects[i].level; break;
                case "slow" : this.defence -= this.statusEffects[i].level; break;
                case "daze" : this.defence -= this.statusEffects[i].level; this.accuracy -= this.statusEffects[i].level; break;
                case "boost-defence" : this.defence += this.statusEffects[i].level;
                case null : break;
                case "none" : break;
                default : break;
              }
            }
          if(Math.random() < 0.2) this.statusEffects[i] = null;
        }
    }
}

export class monster extends actor {
    constructor(name, hp, image, coinReward) {
        super(name, hp, 5, 5);
        this.imagePath = image;
        this.abilities = [];
        this.coinReward = coinReward;
    }

    addAbility(name, effect, sides) {
        var monsterAction = new action(name, effect, sides);
        monsterAction.level = this.coinReward;
        this.abilities.push(monsterAction);
    }
}

export class player extends actor {

        constructor(hp, mana, energy) {
            super("You", hp, 10, 10);
            this.mana = mana;
            this.manaMax = mana;
            this.energy = energy;
            this.energyMax = energy;
            this.skills = [];
            this.spells = [];
            this.inventory = [];
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