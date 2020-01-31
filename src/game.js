const Cell = require("./cell");
const Food = require("./food");
const Mass = require("./mass");
const Util = require("./util");
const Origin = require('./origin');
class Game {
    constructor(){
        this.food = [];
        this.cells = [];
        this.masses = [];
        this.origins = [];
        this.addFood();
    }

    add(object){
        
        if (object instanceof Food){
            this.food.push(object);
        } else if (object instanceof Cell){
            this.cells.push(object)
            console.log(this.cells)
        } else if (object instanceof Mass){this.masses.push(object); 
            console.log(this.masses)}
        else if (object instanceof Origin){this.origins.push(object)}
        else {
            throw new Error("unknown type of object");
        }
    }

    addFood(){
        
        for (let i = 0; i < Game.NUM_FOOD; i++){
            this.add(new Food({game: this, pos: this.randomPosition()}));
        }
    }

    addOrigin(){
        const origin = new Origin({pos: this.cells[0].pos, id: this.cells[0].id, game: this})
        this.add(origin)
    }

    addCell(options){
        if(options){
            const cell = new Cell(options)
            this.add(cell);
            return cell;
        } else {
             const cell = new Cell({
                pos: this.randomPosition(),
                game: this,
                id: this.id
            });
            this.add(cell);
            return cell;
        }
    }

    allObjects(){
        return [].concat(this.cells, this.food, this.masses, this.origins);
    }

    checkCollisions(){
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
        console.log(this.allObjects())
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
        } else if (object instanceof Origin){
            this.origins.splice(this.origins.indexOf(object), 1);
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
Cell.MOVES = {
    w: [0, -1],
    a: [-1, 0],
    s: [0, 1],
    d: [1, 0],
};
Game.BG_COLOR = "#000000";
Game.DIM_X = 1000;
Game.DIM_Y = 600;
Game.FPS = 32;
Game.NUM_FOOD = 500;
module.exports = Game;