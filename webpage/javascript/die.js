export function die(sides) {
    return Math.ceil(Math.random()*sides);
}

export function multiDie(die, sides) {
    var result = 0;
    while(die > 0) {
        result += Math.ceil(Math.random()*sides);
        die--;
        }
    return result;
}