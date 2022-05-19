var myApp = angular.module("battle", []);
import {die, multiDie} from "/webpage/javascript/die.js";
import {shop} from "/webpage/javascript/shop.js";
import {action, playerAction, item} from "/webpage/javascript/action.js";
import {player, monster} from "/webpage/javascript/actor.js";
import {statusEffect} from "/webpage/javascript/statusEffect.js";
import {pickMonster} from '/webpage/javascript/genMonster.js';
myApp.controller("battleController", function($scope) {

    $scope.coins = 10;
    $scope.difficulty = 0;

    function createPlayer() {

        $scope.player = new player(100, 10, 10);
        $scope.player.addSkill("Kick", "daze", 4, 0);
        $scope.player.addSkill("Give up", "heal", 1000, 0);

    }

    function createMonster() {

        $scope.monster = pickMonster($scope.difficulty);
    }

    $scope.showStock = function(item) {
        return item.stock != -1;
    }

    var monsterAction = function() {
        $scope.player.turn();
        var action = $scope.monster.abilities[die($scope.monster.abilities.length)-1];
        if(action.effect != "boost-defence" && action.effect != "heal") {
            if(willHit($scope.monster, $scope.player)) {
                
                alert($scope.monster.name + " uses "+action.name+"\n"+action.preform($scope.player));
            } else
                alert($scope.monster.name + " uses "+action.name+" and mises");
        } else {
            
            alert($scope.monster.name + " uses "+action.name+"\n"+action.preform($scope.monster));
        }
        if($scope.player.hp <= 0) lose();
        $scope.monster.turn();
    }

    $scope.doAction = function(action) {
            if(action.canCast($scope.player)) {
                if(action.effect != "boost-defence" && action.effect != "heal")
                    if(willHit($scope.player, $scope.monster)) {
                        alert(action.preform($scope.monster))
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
            for(const item of $scope.player.inventory) {
                if(item.stock > 0)
                    item.level = $scope.difficulty
            }
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

        $scope.shop = new shop($scope.player);
        $scope.shop.addSkill("Evade", "boost-defence", 0, 1, 1);

        $scope.shop.addSpell("Firebolt", "burn", 8, 2, 2);
        $scope.shop.addSpell("Freeze", "slow", 6, 2, 1);
        $scope.shop.addSpell("Confuse", "daze", 0, 1, 2);

        $scope.shop.addItem("Sword", "none", 6, -1, 4);
        $scope.shop.addItem("Bomb", "none", 10, 0, 4);
        $scope.shop.addItem("Health Potion", "heal", -10, 0, 1);

        $scope.purchaseItems = function() {
            if($scope.shop.totalCost() <= $scope.coins) {
                $scope.coins -= $scope.shop.totalCost();
                $scope.shop.purchase($scope.player);
                $scope.toSelection();
            } else {
                alert("Not enough coins");
            }
        }

});

function willHit(castor, target) {
    return die(castor.accuracy) >= die(target.defence);
}