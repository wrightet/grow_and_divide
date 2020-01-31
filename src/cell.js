const MovingObject = require("./moving_object");
const Mass = require("./mass");
const Util = require("./util");
const Food = require("./food");
const GameView = require('./game_view');
const Origin = require('./origin');

const randomColor = function () {
    const hexDigits = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += hexDigits[Math.floor((Math.random() * 16))];
    }

    return color;
}

const randomId = function (){
    return Math.floor((Math.random() * 1000));
}


class Cell extends MovingObject {
    constructor(options){
       
        options.radius = options.radius ||10;
        options.vel = options.vel || [0,0];
        options.color = options.color || randomColor();
        options.id = options.id || randomId();
        super(options);  
        console.log(options.pos)
        
    }


    collideWith(otherObject) {
        if (otherObject instanceof Food) {
            otherObject.relocate();
            this.grow(.1)
            return true;
        } else if (otherObject instanceof Mass) {
            this.grow(5);
            otherObject.remove();
        } else if (otherObject instanceof Cell && this.radius > (otherObject.radius + this.radius / 10) && this.id !== otherObject.id) {
            this.grow(otherObject.radius);
            otherObject.remove();
        } else if (otherObject instanceof Cell && this.id === otherObject.id){
            let dist = this.radius + otherObject.radius;
            // otherObject.pos = [otherObject.pos[0] + dist, otherObject.pos[1] + dist]
        }
        return false
    }

    grow(ctx) {
     this.radius += ctx;
    }

    shrink(ctx){
        this.radius -= ctx
    }

    fireMass(){
        if (this.radius >= 14){
            const norm = Util.norm(this.vel);
            const relVel = Util.scale(
                Util.dir(this.vel),
                Mass.SPEED
        );

        const massVel = [
            relVel[0] + this. vel[0], relVel[1] + this.vel[1]
        ];

        const mass = new Mass ({
            pos: [(this.pos[0] + this.radius), (this.pos[1]+ this.radius)],
            vel: massVel,
            color: this. color,
            game: this.game
        });
        this.shrink(mass.radius);
        this.game.add(mass);
        }
        
    }

    divide(){
        // console.log(this)
        // if(this.radius > 30){
            this.shrink(this.radius/2)
            
            const cell = new Cell({
                radius: this.radius,
                color: this.color,
                pos: [(this.pos[0] + this.radius + 5), (this.pos[1] + this.radius + 5)],
                game: this.game,
                id: this.id
            })
            this.game.addCell(cell)
            console.log('division')
        // }
        
        
    
    }

    relocate(pos){
        this.pos = pos || this.game.randomPosition();
        this.vel = [0, 0];
    } 
}

module.exports = Cell;

