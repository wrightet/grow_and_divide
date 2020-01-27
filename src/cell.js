const MovingObject = require("./moving_object");




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
        super(options);
        options.radius = Cell.Radius;
        options.vel = options.vel || [0,0];
        options.color = randomColor();
    }

    grow(ctx) {
     this.radius += 1;
    }

    fireMass(){
        // 
    }

    divide(){
        //
    }
}

Cell.RADIUS = 10;

module.exports = Cell;
