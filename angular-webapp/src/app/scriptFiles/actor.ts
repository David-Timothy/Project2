import {action, playerAction, item} from "./action";
import {statusEffect} from "./statusEffect";
import {shop, shopItem} from "./shop";

export class actor {
    immunities: String[];
    statusEffects: statusEffect[];
    name: string;
    defence!: number;
    accuracy!: number;
    accuracyMax!: number;
    defenceMax!: number;
    hp!: number;
    hpMax!: number;
    constructor(name: string, hp: number, accuracy: number, defence: number){
        this.name = name;
        this.setHealth(hp);
        this.setAccuracy(accuracy);
        this.setDefence(defence);
        this.statusEffects = [];
        this.immunities = [];
    }

    addEffect(effect: String, level:number){
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
        return "";
    }

    removeEffect(effect:statusEffect) {
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
    setHealth(hp: number){
        this.hp = hp;
        this.hpMax = hp;
    }
    setAccuracy(acc: number){
        this.accuracy = acc;
        this.accuracyMax = acc;
    }
    setDefence(def: number){
        this.defence = def;
        this.defenceMax = def;
    }
}

export class monster extends actor {
    imagePath: string;
    abilities: action[];
    coinReward: number;
    constructor(name:string, hp:number, accuracy:number, defence:number, image:string, coinReward:number) {
        super(name, hp, accuracy, defence);
        this.imagePath = image;
        this.abilities = [];
        this.coinReward = coinReward;
    }

    addAbility(name:string, effect:string, sides:number, selfTargeted:boolean) {
        var monsterAction = new action(name, effect, sides, selfTargeted);
        monsterAction.level = Math.ceil(this.coinReward*0.5);
        this.abilities.push(monsterAction);
    }
}

export class player extends actor {
        progress: number;
        mana!: number;
        manaMax!: number;
        energy!: number;
        energyMax!: number;
        inventory: item[];
        skills: playerAction[];
        spells: playerAction[];
        coins!: number;

        constructor(hp:number, mana:number, energy:number) {
            super("You", hp, 10, 10);
            this.setMana(mana);
            this.setEnergy(energy);
            this.skills = [];
            this.spells = [];
            this.inventory = [];
            this.progress = 1;
        }

        setMana(mana:number) {
            this.mana = mana;
            this.manaMax = mana;
        }

        setEnergy(energy:number) {
            this.energy = energy;
            this.energyMax = energy;
        }

        addSkill(name:string, effect:string, sides:number, cost:number, selfTargeted:boolean) {
            this.skills.push(new playerAction(name, effect, sides, "energy", cost, this, selfTargeted));
        }

        addSpell(name:string, effect:string, sides:number, cost:number, selfTargeted:boolean) {
           this.spells.push(new playerAction(name, effect, sides, "mana", cost, this, selfTargeted));
        }

        addItem(name:string, effect:string, sides:number, stock:number, selfTargeted:boolean) {
            this.inventory.push(new item(name, effect, sides, this, stock, selfTargeted));
        }

        addShopSkill(shopItem:shopItem) {
            shopItem.storedAction.level = shopItem.buying;
            this.skills.push(shopItem.storedAction);
        }

        addShopSpell(shopItem:shopItem) {;
            shopItem.storedAction.level = shopItem.buying;
            this.spells.push(shopItem.storedAction);
        }

        addShopItem(shopItem:shopItem) {
            if((shopItem.storedAction as item).stock >= 0)
                (shopItem.storedAction as item).stock = shopItem.buying;
            else
                shopItem.storedAction.level = shopItem.buying;
            this.inventory.push((shopItem.storedAction as item));
        }

        addFromShop(shopItem:shopItem) {
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