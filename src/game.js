const Cell = require("./cell");
const Food = require("./food");
const Util = require("./util");

class Game {
    constructor(){
        this.food = [];
        this.cells = [];

        this.addFood();
    }

    add(object){
        if (object instanceof Food){
            this.food.push(object);
        } else if (object instanceof Cell){
            this.cells.push(object)
        } else {
            throw new Error("unknown type of object");
        }
    }

    addFood(){
        for (let i = 0; i < Game.num; i++){
            this.add(new Food({game: this}));
        }
    }


}

Game.NUM_FOOD = 1000;
module.exports = Game;