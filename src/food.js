const MovingObject = require('./moving_object');
const Cell = require('./cell');

function randomColor() {
    const hexDigits = "0123456789ABCDEF";

    let color = "#";
    for (let i = 0; i < 3; i++) {
        color += hexDigits[Math.floor((Math.random() * 16))];
    }

    return color;
}

class Food extends MovingObject{
    constructor(options ={}){
        options.radius = 1;
        options.vel = [0, 0];
        options.color = randomColor();
        super(options);
       
    }

    collideWith(otherObject) {
        if(!otherObject instanceof Food) {
             this.relocate();  
            return true;
        }
        return false
    }  
    relocate() {
        this.pos = this.game.randomPosition();
        this.vel = [0, 0];
    }  

}
module.exports = Food;