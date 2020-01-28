const MovingObject = require('./moving_object');
const Cell = require('./cell');


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

    }
}

module.exports = Food;