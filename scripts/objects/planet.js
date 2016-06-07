var app = app || {};

(function (planetarium) {
    function Planet(x1, y1, x2, y2, radius, mass) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.radius = radius;
        this.mass = mass;
    }

    Planet.prototype.Update = function () {
        this.x1 += this.x2;
        this.y1 += this.y2;
    };

    Planet.prototype.Draw = function (ctx) {
        ctx.beginPath();
        ctx.arc(this.x1, this.y1, this.radius, 0, Math.PI * 2, true);
        ctx.fill();
    };

    Planet.prototype.InteractWithOtherPlanet = function (planet) {
        var distance = Math.sqrt((this.x1 - planet.x1) * (this.x1 - planet.x1) + (this.y1 - planet.y1) * (this.y1 - planet.y1));

        if (distance > Math.max(this.radius, planet.radius)) {
            if (this.x1 < planet.x1) {
                planet.x2 -= this.mass / (distance * distance) * 6.67428 / 1000;
                this.x2 += planet.mass / (distance * distance) * 6.67428 / 1000;
            } else {
                planet.x2 += this.mass / (distance * distance) * 6.67428 / 1000;
                this.x2 -= planet.mass / (distance * distance) * 6.67428 / 1000;
            }
            if (this.y1 < planet.y1) {
                planet.y2 -= this.mass / (distance * distance) * 6.67428 / 1000;
                this.y2 += planet.mass / (distance * distance) * 6.67428 / 1000;
            } else {
                planet.y2 += this.mass / (distance * distance) * 6.67428 / 1000;
                this.y2 -= planet.mass / (distance * distance) * 6.67428 / 1000;
            }
        }
    };

    planetarium.Planet = Planet;
}(app));
