const MovingObject = require("./moving_object");
const Mass = require("./mass");
const Util = require("./util");
const Food = require("./food");

const randomColor = function () {
    const hexDigits = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += hexDigits[Math.floor((Math.random() * 16))];
    }

    return color;
}

class Cell extends MovingObject {
    constructor(options){
        options.radius = 10;
        options.vel = options.vel || [0,0];
        options.color = randomColor();
        super(options);
        
    }

    collidedWith(object){
        if(object instanceof Food){
            this.grow(1);
            // object.relocate();
        } else if (object instanceof Mass) {
            this.grow(10);
            object.remove();
        } else if (object  instanceof Cell && this.radius > object.radius) {
            this.grow(object.radius);
        }
    }
    grow(ctx) {
     this.radius += ctx;
    }

    shrink(ctx){
        this.radius -= ctx
    }

    fireMass(){
        const norm = Util.norm(this.vel);

        const relVel = Util.scale(
            Util.dir(this.vel),
            Mass.SPEED
        );

        const massVel = [
            relVel[0] + this. vel[0], relVel[1] + this.vel[1]
        ];

        const mass = new Mass ({
            pos: this.pos,
            vel: massVel,
            color: this. color,
            game: this.game
        });

        this.game.add(mass);
    }

    divide(){
        //
    }

    power(impulse){
        this.vel[0] += impulse[0];
        this.vel[1] += impulse[1]
    }


    relocate() {
        this.pos = this.game.randomPosition();
        this.vel = [0, 0];
    }
}

Cell.RADIUS = 10;

module.exports = Cell;
