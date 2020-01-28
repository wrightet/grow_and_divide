const MovingObject = require('./moving_object');
const Cell = require('./cell');
const Food = require('./food');

class Mass extends MovingObject {
    constructor(options) {
        options.radius = 5;
        options.vel = [0, 0];
        options.color = Cell.color;
        super(options);
    }

    collideWith(otherObject) {
        if (otherObject instanceof Cell) {
            return true;
        }
        if (otherObject instanceof Food){
            return true;
        }

    }
}

module.exports = Mass;