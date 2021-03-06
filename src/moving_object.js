const Util = require('./util')

class MovingObject {
    constructor(options){
        this.pos = options.pos;
        this.vel = options.vel;
        this.radius = options.radius;
        this.color = options.color;
        this.game = options.game;
        this.isStoppable = true;
        this.id = options.id;
        this.cloneId = options.cloneId;
    }

    collideWith(otherObject) {
        // default do nothing
    }

    draw(ctx) {
        ctx.fillStyle = this.color;

        ctx.beginPath();
        ctx.arc(
            this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true 
        );
        ctx.fill();
    }

    isCollidedWith(otherObject){
        const centerDist = Util.dist(this.pos, otherObject.pos);
        return centerDist < (this.radius + otherObject.radius);
    }

    move(timeDelta) {
        // timeDelta is number of milliseconds since last move
        // if the computer is busy the time delta will be larger
        // in this case the MovingObject should move farther in this frame
        // velocity of object is how far it should move in 1/60th of a second
        const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
            offsetX = this.vel[0] * velocityScale,
            offsetY = this.vel[1] * velocityScale;
        this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];
        if (this.game.isOutOfBounds(this.pos, this.radius)) {
            if (this.isStoppable) {
                this.vel = [0, 0] //stops wrapping
                // if (this.pos[0] <= 0 + this.radius){
                //     this.pos = [this.pos[0]+ this.radius, this.pos[1]]
                // } else if (this.pos[0] >= (800 - this.radius)){
                //     this.pos = [this.pos[0] - this.radius, this.pos[1]]
                //     // this.vel = [0,0]
                // } else if (this.pos[1] <= 0 + this.radius){
                //     this.pos = [this.pos[0], this.pos[1] + this.radius]
                // } else if (this.pos[1] > 600 - this.radius) {
                //     this.pos = [this.pos[0], this.pos[1] - this.radius]
                // }
                
                
            } else {
                this.remove();
            }
        }
    }

    remove() {
        this.game.remove(this);  
    }
}

const NORMAL_FRAME_TIME_DELTA = 1000/60;

module.exports = MovingObject;