import {monster} from "/webpage/javascript/actor.js";
import {die, multiDie} from "/webpage/javascript/die.js";

export function pickMonster(difficulty) {
    var coins = difficulty;
    difficulty = Math.ceil(difficulty*0.66)
    var request = new XMLHttpRequest();
    var generatedMonster = null;

    request.open('GET', 'json/monsters.json', false);

    request.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            var monsters = JSON.parse(this.responseText);
            var index = die(monsters.count)-1;
            var selected = monsters.monsters[index];
            generatedMonster = 
                new monster(selected.name, 
                    parseInt(selected.baseHP, 10)+multiDie(difficulty, selected.hpDie),
                    parseInt(selected.baseAcr,10)+Math.floor(selected.acrIncr*difficulty),
                    parseInt(selected.baseDef, 10)+Math.floor(selected.defIncr*difficulty),
                    selected.imgPath,
                    coins
                    );
            for(const ability of selected.abilities) {
                generatedMonster.addAbility(ability.name, ability.effect, ability.sides);
            }
        }
        else {
            console.log("Loading");
        }
    }
    request.send();
    return generatedMonster;
}

/*
$scope.monster = new monster("Monster 1", 10+multiDie($scope.difficulty, 6), "resources/monster1.png",$scope.difficulty);

        $scope.monster.addAbility("Bite", "none", 6);
        $scope.monster.addAbility("Scream", "daze", 4);
        $scope.monster.accuracy += Math.floor($scope.difficulty/2);
        $scope.monster.accuracyMax += Math.floor($scope.difficulty/2);
        $scope.monster.defence += Math.floor($scope.difficulty/4);
        $scope.monster.defenceMax += Math.floor($scope.difficulty/4);
*/