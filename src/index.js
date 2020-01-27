
const MovingObject = require('./moving_object');

document.addEventListener("DOMContentLoaded", () => {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.moveTo(0,0);
    ctx.lineTo(200,100);
    ctx.stroke() ;   
    console.log("webpack is working")
    window.MovingObject = MovingObject;
})