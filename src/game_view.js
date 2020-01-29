

class GameView {
    constructor(game, ctx){
        this.ctx = ctx;
        this.game = game;
        this.cell = this.game.addCell();
        
    }

    bindKeyHandlers(){
        const cell = this.cell;

        Object.keys(GameView.MOVES).forEach((k) => {
            const move = GameView.MOVES[k];
            key(k, () => {cell.power(move); });
        });
        // debugger
        key("e", () => { cell.fireMass();});
        key("g", () => {cell.grow(10);}); //testing purposes only
        // key("space", () => {cell.divide();});
    }

    start() {
        this.bindKeyHandlers();
        this.lastTime = 0;
        // start the animation
        requestAnimationFrame(this.animate.bind(this));
    }

    animate(time) {
        const timeDelta = time - this.lastTime;

        this.game.step(timeDelta);
        this.game.draw(this.ctx);
        this.lastTime = time;

        // every call to animate requests causes another call to animate
        requestAnimationFrame(this.animate.bind(this));
    }


}
//change to cursor control later
GameView.MOVES = {
    w: [0, -1],
    a: [-1, 0],
    s: [0, 1],
    d: [1, 0],
};

module.exports = GameView;