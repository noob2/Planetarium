var app = app || {};

(function (app) {

    (function start() {
        return setInterval(nextFrame, 10);
    })();

    function nextFrame() {


        app.planets.forEach(function (planetA) {
            app.planets.forEach(function (planetB, i) {
                if (planetA !== planetB) {

                    var distance = planetA.position.DistanceTo(planetB.position);
                    var biggerRadius = Math.max(planetA.radius, planetB.radius);

                    if (distance > biggerRadius) {
                        planetA.InteractWithOtherPlanet(planetB);
                    }
                    else {
                        planetA.Crash(planetB);
                        app.planets.splice(i, 1);
                    }
                }
            });
            planetA.Update();
        });

        app.ctx.clear();
        app.planets.forEach(function (planet) {
            planet.Draw();
        });

        $("#objectsCount").val(app.planets.length);

        if (doIDrawArrow) {
            planetPosition.LineTo(client);
        }
    }

    var planetPosition = new app.Point();

    var headingToPosition = new app.Point();

    var client = new app.Point();

    var doIDrawArrow;

    app.$fieldCanvas.on('mousedown mouseup', function (event) {
        app.$fieldCanvas.mousemove(function (event) {
            client.x = event.clientX;
            client.y = event.clientY;
        });
        if (event.type === "mousedown") {
            doIDrawArrow = true;
            planetPosition.x = event.clientX;
            planetPosition.y = event.clientY;
        }
        else if (event.type === "mouseup") {
            doIDrawArrow = false;
            headingToPosition.x = event.clientX;
            headingToPosition.y = event.clientY;

            //addPlanet
            var rad = $("#radius").val();
            var mas = $("#mass").val();
            if (rad > 0 && mas > 0) {
                app.planets.push(new app.Planet(planetPosition, headingToPosition, rad, mas));
            }
        }
    });

    $('#clear').on("click", function () {
        app.planets = [];
    });

}(app));