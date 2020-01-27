const Cell = function(centerX, centerY, color) {
    this.centerX = centerX;
    this.centerY = centerY;
    this.radius = 5;
    this.color = color;
}

const HEX_DIGITS = "0123456789ABCDEF";

Cell.prototype.randomColor = function () {
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += HEX_DIGITS[Math.floor((Math.random() * 16))];
    }

    return color;
}

Cell.prototype.grow = function(ctx) {
    this.radius += 1;
}

Cell.prototype.render = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
        this.centerX,
        this.centerY,
        this.radius,
        0,
        2 * Math.PI,
        false
    );

    ctx.fill();
}