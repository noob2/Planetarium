var app = app || {};

(function (planetarium) {

    var planetPositionX, planetPositionY, planetNextFrameX, planetNextFrameY, clientX, clientY, doIDrawArrow;

    $('#space').on('mousedown mouseup', function mouseState(event) {
        $('#space').mousemove(function (event) {
            clientX = event.clientX;
            clientY = event.clientY;
        });
        if (event.type == "mousedown") {
            doIDrawArrow = true;
            planetPositionX = event.clientX;
            planetPositionY = event.clientY;
        }
        else if (event.type == "mouseup") {
            doIDrawArrow = false;
            $('#space').unbind('mousemove');
            planetNextFrameX = event.clientX;
            planetNextFrameY = event.clientY;

            addPlanet();
        }
    });

    function addPlanet() {
        var rad = $("#radius").val();
        var mas = $("#mass").val();
        if (rad > 0 && mas > 0) {
            planetarium.planetArray.push(new planetarium.Planet(planetPositionX, planetPositionY, planetNextFrameX, planetNextFrameY, rad, mas));
        }
    }

    (function start() {
        return setInterval(nextFrame, 10);
    })();

    function nextFrame() {
        planetarium.ctx.clear();

        for (var i = 0; i < planetarium.planetArray.length; i++) {
            for (var j = i; j < planetarium.planetArray.length - 1; j++) {
                planetarium.planetArray[i].InteractWithOtherPlanet(planetarium.planetArray[j + 1]);
            }
        }

        planetarium.planetArray.forEach(function (planet) {
            planet.Update();
            planet.Draw();
        });

        if (doIDrawArrow) {
            (new planetarium.Arrow(planetPositionX, planetPositionY)).Draw(clientX, clientY);
        }
    }
}(app));