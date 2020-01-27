

function MovingObject(options){
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.game = options.game;
}

MovingObject.prototype.collideWith = function collideWith(otherObject) {
    //default does nothing
}

MovingObject.prototype.draw = function draw(ctx) {
    ctx
}

MovingObject.prototype.isCollidedWith = function isCollidedWith(otherObject) {
    const centerDist = Util.dist(this.pos, otherObject.pos);
    return centerDist < (this.radius + otherObject.radius);
};

MovingObject.prototype.remove = function remove() {
    this.game.remove(this);
};

// MovingObject.prototype.isWrappable = true;

// const NORMAL_FRAME_TIME_DELTA = 1000 / 60;
// MovingObject.prototype.move = function move(timeDelta) {
//     // timeDelta is number of milliseconds since last move
//     // if the computer is busy the time delta will be larger
//     // in this case the MovingObject should move farther in this frame
//     // velocity of object is how far it should move in 1/60th of a second
//     const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
//         offsetX = this.vel[0] * velocityScale,
//         offsetY = this.vel[1] * velocityScale;

//     this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];

//     if (this.game.isOutOfBounds(this.pos)) {
//         if (this.isWrappable) {
//             this.pos = this.game.wrap(this.pos);
//         } else {
//             this.remove();
//         }
//     }
// };

module.exports = MovingObject;