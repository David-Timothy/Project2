var myApp = angular.module("battle", []);

class monster {
    constructor(name, hp, image){
        this.name = name;
        this.hp = hp;
        this.hpMax = hp;
        this.imagePath = image;
    }
}
myApp.controller("battleController", function($scope) {

    $scope.skills = ['Kick', 'Evade'];

    $scope.spells = ['Firebolt', 'Freeze', 'Confuse', 'Weaken'];

    $scope.items = ['Sword', 'Crossbow', 'Bomb', 'Health Potion', 'Mana Potion'];

    $scope.logs = [1,0];

    $scope.hpMax = 100;
    $scope.hp = 90;

    $scope.mana = 6;
    $scope.manaMax = 10;

    $scope.energy = 7;
    $scope.energyMax = 10;

    $scope.monster = new monster("Monster 1", 10, "resources/monster1.png");

});