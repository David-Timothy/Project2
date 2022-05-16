var myApp = angular.module("battle", []);

myApp.controller("battleController", function($scope) {

    $scope.coins = 0;
    $scope.difficulty = 0;

    function createPlayer() {

    $scope.player = new player(100, 10, 10);

    $scope.player.addSkill("Kick", "daze", 4, 1);
    $scope.player.addSkill("Evade", "boost-defence", 0, 1);
    $scope.player.addSkill("Give up", "heal", 1000, 0);

    $scope.player.addSpell("Firebolt", "burn", 8, 2);
    $scope.player.addSpell("Freeze", "slow", 6, 2);
    $scope.player.addSpell("Confuse", "daze", 0, 1);

    $scope.player.addItem("Sword", "none", 6, -1);
    $scope.player.addItem("Bomb", "none", 12, 5);
    $scope.player.addItem("Health Potion", "heal", -10, 5);

    }

    function createMonster() {

        $scope.monster = new monster("Monster 1", 10+die($scope.difficulty*6), "resources/monster1.png");
        console.log($scope.monster.imagePath);

        $scope.monster.addAbility("Bite", "none", 6+$scope.difficulty);
        $scope.monster.addAbility("Scream", "daze", 4);
        $scope.monster.accuracy += Math.floor($scope.difficulty/2);
        $scope.monster.accuracyMax += Math.floor($scope.difficulty/2);
        $scope.monster.defence += Math.floor($scope.difficulty/4);
        $scope.monster.defenceMax += Math.floor($scope.difficulty/4);
        $scope.monster.coinReward = $scope.difficulty;
    }

    $scope.showStock = function(item) {
        return item.stock != -1;
    }

    monsterAction = function() {
        $scope.monster.turn();
        console.log($scope.monster.statusEffects);
        var action = $scope.monster.abilities[die($scope.monster.abilities.length)-1];
        if(action.effect != "boost")
            if(willHit($scope.monster, $scope.player)) {
                action.preform($scope.player)
                alert($scope.monster.name + " uses "+action.name);
            } else
                alert($scope.monster.name + " uses "+action.name+" and mises");
        else {
            action.preform($scope.monster);
        }

        $scope.player.turn();
        if($scope.player.hp <= 0) lose();
    }

        $scope.doAction = function(action) {
            if(action.canCast($scope.player)) {
                if(action.effect != "boost-defence" && action.effect != "heal")
                    if(willHit($scope.player, $scope.monster)) {
                        action.preform($scope.monster)
                        alert("Hit")
                    } else
                        alert("Miss")
                else {
                    action.preform($scope.player);
                }
                if($scope.monster.hp <= 0) win();
                else monsterAction();

            }
        }

        $scope.state = "shop";
        createPlayer();

        $scope.toShop = function() {
            $scope.state = "shop";
            $scope.difficulty = 0;
            createPlayer();
        }
        $scope.toBattle = function() {
            $scope.state = "battle";
        }
        $scope.toSelection = function() {
            $scope.difficulty++;
            createMonster();
            $scope.state = "selection";
        }

        $scope.inShop = function() {
            return $scope.state == "shop";
        }
        $scope.inBattle = function() {
            return $scope.state == "battle";
        }
        $scope.inSelection = function() {
            return $scope.state == "selection";
        }


        function win() {
            $scope.coins += $scope.monster.coinReward;
            alert("You win\nCoins Gained : "+$scope.monster.coinReward+"\n Total Coins : "+$scope.coins);

            $scope.toSelection();
        }
        function lose() {
            alert("You Fainted");
            $scope.toShop();
        }


});
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
            if(done.indexOf(this.statusEffects[i]) == -1) {
              done.push(this.statusEffects[i]);
              switch (this.statusEffects[i]) {
                case "burn" : this.hp -= 3; break;
                case "slow" : this.defence -= 4; break;
                case "daze" : this.defence -= 2; this.accuracy -= 2; break;
                case "boost-defence" : this.defence += 2;
                case null : break;
                case "none" : break;
                default : break;
              }
            }
          if(Math.random() < 0.2) this.statusEffects[i] = null;
        }
    }
}

class monster extends actor {
    constructor(name, hp, image) {
        super(name, hp, 5, 5);
        this.imagePath = image;
        this.abilities = [];
        this.coinReward = 1;
    }

    addAbility(name, effect, sides) {
        this.abilities.push(new action(name, effect, sides));
    }
}

class player extends actor {

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
}

class action {
    constructor(name, effect, sides) {
        this.name = name;
        this.effect = effect;
        this.sides = sides;
    }

    preform(target) {
        target.hp = target.hp - die(this.sides);
        target.statusEffects.push(this.effect);
        if(target.hp < 0) target.hp = 0;
        if(target.hp > target.hpMax) target.hp = target.hpMax;
    }
}

class playerAction extends action {
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
        super.preform(target);
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

class item extends playerAction {
    constructor(name, effect, sides, player, stock) {
        super(name, effect, sides, "item", 0, player);
        this.stock = stock;
    }

    preform(target) {
        super.preform(target);
        if(this.stock > 0)
            this.stock = this.stock-1;
    }

    canCast(castor) {
        return this.stock != 0;
    }
}

function willHit(castor, target) {
    return die(castor.accuracy) >= die(target.defence);
}

function die(sides) {
    return Math.ceil(Math.random()*sides);
}

function multiDie(die, sides) {
    var result = 0;
    while(die > 0)
        result += Math.ceil(Math.random()*sides);
    return result;
}