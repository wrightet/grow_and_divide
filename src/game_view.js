

class GameView {
    constructor(game, ctx){
        this.ctx = ctx;
        this.game = game;
        this.cells = this.game.cells
        this.cell = this.game.addCell();
        this.origin = this.game.addOrigin();
        this.enemy= this.game.addCell();
    }
  

    bindKeyHandlers(){

        Object.keys(GameView.MOVES).forEach((k) => {
            const move = GameView.MOVES[k];
            key(k, () => {
                this.game.origins.forEach(unit => {
                    unit.power(move);
                })
            });
        });
       this.game.cells.forEach(cell => {
           if(cell.id === this.game.origins[0].id){
                key("e", () => { cell.fireMass();});
                key("g", () => {cell.grow(10);}); //testing purposes only
                key("space", () => {
                    
                    if(cell.radius > 30){
                        console.log(cell)
                        console.log(cell.radius)
                        console.log('divide')
                        cell.divide(); 
                    }
                })
            }
            
                
            });
       
       
    }

    start(){
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
    d: [1, 0]
};

module.exports = GameView;