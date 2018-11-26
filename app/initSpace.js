var app = app || {};

(function (app) {
    app.$fieldCanvas = $('#field');

    var canvasWidth = window.innerWidth;
    var canvasHeight = window.innerHeight;

    app.$fieldCanvas[0].setAttribute('width', canvasWidth);
    app.$fieldCanvas[0].setAttribute('height', canvasHeight);

    app.ctx = app.$fieldCanvas[0].getContext("2d");
    app.planets = [];

    app.ctx.clear = function () {
        app.ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    };
}(app));
