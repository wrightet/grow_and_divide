const MovingObject = require('./moving_object')
const Cell = require('./cell');
class Origin extends MovingObject{
    constructor(props){
        super(props)
        this.pos = props.pos
        this.vel = [0,0]
        this.radius = 5; //testing purposes
        this.id = props.id
        this.color = props.color;
        // this.color = '#AAffffff' //testing purposes
        this.game = props.game;
        
    }
    
    power(impulse) {
        let count = 0;
        this.vel[0] += impulse[0];
        this.vel[1] += impulse[1];
        this.pos[0] += this.vel[0];
        this.pos[1] += this.vel[1];
        if (count <= 1){
            this.updateFollow(this.pos, this.vel)
        }
    }

    updateFollow(pos, vel){
        let int = 100;
            this.game.cells.forEach(cell => {
                if(cell.pos !== pos && cell.id === this.id){
                    if(pos < 0){
                        cell.pos = [pos[0] + this.radius, pos[1]]
                    }
                    cell.pos = pos;
                    cell.vel = vel;
                }
                
        })
    }
  
    
}

module.exports = Origin;