var app = app || {};

(function (planetarium) {
    const WIDTH = 800;
    const HEIGHT = 800;

    var spaceCanvas = $('#space')[0];
    spaceCanvas.setAttribute('width', WIDTH);
    spaceCanvas.setAttribute('height', HEIGHT);

    planetarium.ctx = spaceCanvas.getContext("2d");
    planetarium.planetArray = [];
    planetarium.arrow = {};
    
    planetarium.ctx.clear = function () {
        planetarium.ctx.clearRect(0, 0, WIDTH, HEIGHT);
    };
}(app));
