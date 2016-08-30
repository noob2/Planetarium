var app = app || {};

(function (planetarium) {

    var planetPositionX, planetPositionY, planetNextFrameX, planetNextFrameY, clientX, clientY, doIDrawArrow;
    const OFFSET = parseInt($('#space').css('marginTop').replace('px', '')) + 10;
    $('#space').on('mousedown mouseup', function mouseState(event) {
        $('#space').mousemove(function (event) {
            clientX = event.clientX - OFFSET;
            clientY = event.clientY - OFFSET;
        });
        if (event.type == "mousedown") {
            doIDrawArrow = true;
            planetPositionX = event.clientX - OFFSET;
            planetPositionY = event.clientY - OFFSET;
        }
        else if (event.type == "mouseup") {
            doIDrawArrow = false;
            $('#space').unbind('mousemove');
            planetNextFrameX = event.clientX - OFFSET;
            planetNextFrameY = event.clientY - OFFSET;

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

        planetarium.planetArray.forEach(function (planetA) {
            planetarium.planetArray.forEach(function (planetB, i) {
                if (planetA !== planetB) {
                    planetA.InteractWithOtherPlanet(planetB);

                    //remove the planet if collided with the other
                    if (planetB.mass == 0) {
                        planetarium.planetArray.splice(i, 1);
                    }
                }
            });
            planetA.Update();
            planetA.Draw();
        });

        if (doIDrawArrow) {
            (new planetarium.Arrow(planetPositionX, planetPositionY)).Draw(clientX, clientY);
        }
    }
}(app));