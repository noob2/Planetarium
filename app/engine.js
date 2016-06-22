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
            planetarium.planetArray.forEach(function (planetB,i) {
                if (planetA !== planetB) {

                    var distance = Math.sqrt(Math.pow(planetA.x - planetB.x, 2) +
                        Math.pow(planetA.y - planetB.y, 2));

                    if (distance > Math.max(planetA.radius, planetB.radius)) {
                        planetA.InteractWithOtherPlanet(planetB);
                    } else {//crash
                        var finalVelocityX = (planetA.mass*planetA.velocityX + planetB.mass*planetB.velocityX)/(planetA.velocityX + planetB.velocityX);
                        var finalVelocityY = (planetA.mass*planetA.velocityY + planetB.mass*planetB.velocityY)/(planetA.velocityY + planetB.velocityY);
console.log(finalVelocityX,finalVelocityY)
                        planetA.velocityX = finalVelocityX;
                        planetA.velocityY = finalVelocityY;
                        planetA.mass = parseInt(planetA.mass) + parseInt(planetB.mass);
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