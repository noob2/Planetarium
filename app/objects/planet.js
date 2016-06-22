var app = app || {};

(function (planetarium) {
    function Planet(planetPositionX, planetPositionY, planetNextFrameX, planetNextFrameY, radius, mass) {
        this.x = planetPositionX;
        this.y = planetPositionY;

        this.velocityX = planetNextFrameX - planetPositionX;
        this.velocityY = planetNextFrameY - planetPositionY;

        this.radius = radius;
        this.mass = mass;
    }

    Planet.prototype.Update = function () {
        const ACCELERATION_REDUCTION = 100;

        this.x += this.velocityX / ACCELERATION_REDUCTION;
        this.y += this.velocityY / ACCELERATION_REDUCTION;
    };

    Planet.prototype.Draw = function () {
        planetarium.ctx.beginPath();
        planetarium.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        planetarium.ctx.fill();
    };

    Planet.prototype.InteractWithOtherPlanet = function (planet) {
        var distance = Math.sqrt(Math.pow(this.x - planet.x, 2) + Math.pow(this.y - planet.y, 2));

        if (distance > Math.max(this.radius, planet.radius)) {
            const GRAVITATY_POWER = 6.67428;

            var attractionAmountForFirstPlanet = (this.mass * GRAVITATY_POWER) / (distance * distance);
            var attractionAmountForSecondPlanet = (planet.mass * GRAVITATY_POWER) / (distance * distance);

            if (this.x < planet.x) {
                planet.velocityX -= attractionAmountForFirstPlanet;
                this.velocityX += attractionAmountForSecondPlanet;
            } else {
                planet.velocityX += attractionAmountForFirstPlanet;
                this.velocityX -= attractionAmountForSecondPlanet;
            }

            if (this.y < planet.y) {
                planet.velocityY -= attractionAmountForFirstPlanet;
                this.velocityY += attractionAmountForSecondPlanet;
            } else {
                planet.velocityY += attractionAmountForFirstPlanet;
                this.velocityY -= attractionAmountForSecondPlanet;
            }
        } else { // planets crash
            
        }
    };

    planetarium.Planet = Planet;
}(app));