var app = app || {};

(function (planetarium) {

    var planetPositionX, planetPositionY, planetVelocityX, planetVelocityY;

    $('#space').on('mousedown mouseup', function mouseState(event) {
        if (event.type === "mousedown") {
            planetPositionX = event.clientX;
            planetPositionY = event.clientY;
        }
        else if (event.type === "mouseup") {
            planetVelocityX = event.clientX;
            planetVelocityY = event.clientY;

            addPlanet();
        }
    });

    function addPlanet() {
        var rad = $("#radius").val();
        var mas = $("#mass").val();
        if (rad > 0 && mas > 0) {
            planetarium.planets.push(new planetarium.Planet(planetPositionX, planetPositionY, (planetVelocityX - planetPositionX) / 100, (planetVelocityY - planetPositionY) / 100, rad, mas * 10));
        }
    }

    (function start() {
        return setInterval(nextFrame, 10);
    })();

    function nextFrame() {
        planetarium.ctx.clear();

        for (var i = 0; i < planetarium.planets.length; i++) {
            for (var j = i; j < planetarium.planets.length - 1; j++) {
                planetarium.planets[i].InteractWithOtherPlanet(planetarium.planets[j + 1]);
            }
        }

        planetarium.planets.forEach(function (planet) {
            planet.Update();
            planet.Draw(planetarium.ctx);
        })
    }
}(app));