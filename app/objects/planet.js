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
            const GRAVITY_POWER = 6.67428;

            var attractionAmountForFirstPlanet = (this.mass * GRAVITY_POWER) / (distance * distance);
            var attractionAmountForSecondPlanet = (planet.mass * GRAVITY_POWER) / (distance * distance);

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
            var totalVolume = 4 / 3 * Math.PI * Math.pow(this.radius, 3) + 4 / 3 * Math.PI * Math.pow(planet.radius, 3);
            this.mass = parseInt(this.mass) + parseInt(planet.mass);
            this.radius = 0.62035 * Math.pow(totalVolume, 1 / 3);

            this.velocityX += planet.velocityX * (planet.mass / this.mass)/2;
            this.velocityY += planet.velocityY * (planet.mass / this.mass)/2;

            planet.mass = 0;
        }
    };

    planetarium.Planet = Planet;
}(app));