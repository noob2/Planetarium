var app = app || {};

(function (planetarium) {
    function Arrow(x1, y1) {
        this.x1 = x1;
        this.y1 = y1;
    }

    Arrow.prototype.Draw = function (x2, y2) {
        planetarium.ctx.beginPath();
        planetarium.ctx.moveTo(this.x1, this.y1);
        planetarium.ctx.lineTo(x2, y2);
        planetarium.ctx.stroke();
    };

    planetarium.Arrow = Arrow;
}(app));