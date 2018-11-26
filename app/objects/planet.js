var app = app || {};

(function (app) {

    class Planet {
        constructor(position, headingToPosition, radius, mass) {
            this.position = new app.Point(position.x, position.y);
            this.headingToPosition = new app.Point(headingToPosition.x, headingToPosition.y);
            this.direction = new app.Point(this.headingToPosition.x - this.position.x,
                this.headingToPosition.y - this.position.y);

            this.radius = radius;
            this.mass = mass;
        }

        Update() {
            const speedReduction = 20;
            this.position.add(this.direction.x / speedReduction, this.direction.y / speedReduction);

        };

        Draw() {
            app.ctx.beginPath();
            app.ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, true);
            app.ctx.fill();
            app.ctx.closePath();
        };

        InteractWithOtherPlanet(planet) {
            var distance = planet.position.DistanceTo(this.position);
            var thisPlanetStrength = (this.mass * planet.mass) / Math.pow(distance, 2);
            var otherPlanetStrength = (planet.mass * planet.mass) / Math.pow(distance, 2);
            var direction = new app.Point(this.position.x - planet.position.x, this.position.y - planet.position.y);

            planet.direction.add(direction.x * thisPlanetStrength, direction.y * thisPlanetStrength);
            this.direction.add(-direction.x * otherPlanetStrength, -direction.y * otherPlanetStrength);


        };
        Crash(planet){
            var massMultiplyer = this.mass*planet.mass;

            this.direction.x = (this.direction.x*this.mass + planet.direction.x*planet.mass)/massMultiplyer;
            this.direction.y = (this.direction.y*this.mass + planet.direction.y*planet.mass)/massMultiplyer;

            var totalVolume = 4 / 3 * Math.PI * Math.pow(this.radius, 3) + 4 / 3 * Math.PI * Math.pow(planet.radius, 3);
            this.mass = parseInt(this.mass) + parseInt(planet.mass);
            this.radius = 0.62035 * Math.pow(totalVolume, 1 / 3);

        }
    }

    app.Planet = Planet;
}(app));