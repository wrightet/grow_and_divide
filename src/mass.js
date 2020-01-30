const MovingObject = require('./moving_object');
const Cell = require('./cell');
const Food = require('./food');

class Mass extends MovingObject {
    constructor(options) {
        options.radius = 10;
        // options.vel = [0, 0];
        options.color = Cell.color;
        super(options);
    }
}
 Mass.SPEED = 6;
module.exports = Mass;