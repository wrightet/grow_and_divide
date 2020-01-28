const Cell = require("./cell");
const Food = require("./food");
const Mass = require("./mass");
const Util = require("./util");

class Game {
    constructor(){
        this.food = [];
        this.cells = [];
        this.masses = [];
        this.addFood();
   
    }

    add(object){
        
        if (object instanceof Food){
            this.food.push(object);
        } else if (object instanceof Cell){
            this.cells.push(object)
        } else if (object instanceof Mass){this.masses.push(object)}
        else {
            throw new Error("unknown type of object");
        }
    }

    addFood(){
        
        for (let i = 0; i < Game.NUM_FOOD; i++){
            this.add(new Food({game: this, pos: this.randomPosition()}));
        }
    }

    addCell(){
      
        const cell = new Cell({
            pos: this.randomPosition(),
            game: this
        });
        this.add(cell);
        return cell;
    }

    allObjects(){
        return [].concat(this.cells, this.food);
    }

    checkCollisions(){
        // debugger
        const allObjects = this.allObjects();
        for (let i = 0; i < allObjects.length; i++){
            for (let j = 0; j < allObjects.length; j++){
                const obj1 = allObjects[i];
                const obj2 = allObjects[j];

                if (obj1.isCollidedWith(obj2)){
                
                    const collison = obj1.collideWith(obj2);
                    if( collison) return;
                }
            }
        }
    }

    draw(ctx) {
        
        ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
        ctx.fillStyle = Game.BG_COLOR;
        ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

        this.allObjects().forEach((object) => {
            object.draw(ctx);
        });
    }

    isOutOfBounds(pos) {
        return (pos[0] < 0) || (pos[1] < 0) ||
            (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
    }

    moveObjects(delta) {
        this.allObjects().forEach((object) => {
            object.move(delta);
        });
    }

    randomPosition() {
        return [
            Game.DIM_X * Math.random(),
            Game.DIM_Y * Math.random()
        ];
    }

    remove(object) {
        if (object instanceof Mass) {
            this.masses.splice(this.masses.indexOf(object), 1);
        } else if (object instanceof Food) {
            this.food.splice(this.food.indexOf(object), 1);
        } else if (object instanceof Cell) {
            this.cells.splice(this.cells.indexOf(object), 1);
        } else {
            throw new Error("unknown type of object");
        }
    }

    step(delta) {
        this.moveObjects(delta);
        this.checkCollisions();
    }

    wrap(pos) {
        return [
            Util.wrap(pos[0], Game.DIM_X), Util.wrap(pos[1], Game.DIM_Y)
        ];
    }

}

Game.BG_COLOR = "#000000";
Game.DIM_X = 1000;
Game.DIM_Y = 600;
Game.FPS = 32;
Game.NUM_FOOD = 1000;
module.exports = Game;