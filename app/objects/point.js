var app = app || {};

(function (app) {
    class Point{
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }

        LineTo(point) {
            app.ctx.beginPath();
            app.ctx.moveTo(this.x, this.y);
            app.ctx.lineTo(point.x, point.y);
            app.ctx.stroke();
        };
        DistanceTo(point){
            return Math.sqrt(Math.pow(this.x - point.x, 2) + Math.pow(this.y - point.y, 2));
        }
        add(x,y){
            this.x += x;
            this.y += y;
        }
    }
    app.Point = Point;
}(app));