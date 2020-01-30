const MovingObject = require('./moving_object')

class Origin extends MovingObject{
    constructor(props){
        super(props)
        this.pos = props.pos
        this.vel = [0,0]
        this.radius = 5; //testing purposes
        this.id = props.id
        this.color = '#ffffff' //testing purposes
        this.game = props.game;
        
    }
    power(impulse) {
        this.vel[0] += impulse[0];
        this.vel[1] += impulse[1]
        this.game.cells.follow(this.pos)
    }
    
}

module.exports = Origin;