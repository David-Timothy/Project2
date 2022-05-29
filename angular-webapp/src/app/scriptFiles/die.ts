export function die(sides:number) {
    return Math.ceil(Math.random()*sides);
}

export function multiDie(die:number, sides:number) {
    var result = 0;
    while(die > 0) {
        result += Math.ceil(Math.random()*sides);
        die--;
        }
    return result;
}