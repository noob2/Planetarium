var canvas;
var ctx;

const WIDTH = 800;
const HEIGHT = 800;

var planetArray = [];
//todo : tova trqbva da se mahne ottuk

var mouseDown = 0;

document.body.onmousedown = function () {
    mouseDown = 1;
};

document.body.onmouseup = function () {
    mouseDown = 0;
};

(function init() {

    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    canvas.setAttribute('width', WIDTH);
    canvas.setAttribute('height', HEIGHT);
    canvas.style.backgroundImage = "url('images/andromeda.jpg')";
    canvas.addEventListener("mousedown", addPlanet, false);

    var x = 0;
    var y = 0;
    
    var x2 = 0;
    var y2 = 0;

    function addPlanet(event) {
        if (x === 0 || y === 0) {
            x = event.clientX - canvas.offsetLeft;
            y = event.clientY - canvas.offsetTop;
        } else if (x !== 0 || y !== 0) {
            x2 = event.clientX - canvas.offsetLeft;
            y2 = event.clientY - canvas.offsetTop;

            var rad = document.getElementById("radius").value;
            var mas = document.getElementById("mass").value;
            
            var radiusParagraph = document.getElementById("numericRadius");
            var massParagraph = document.getElementById("numericMass");

            if (rad > 0 && mas > 0) {
                planetArray.push(new Planet(x, y, (x2 - x) / 100, (y2 - y) / 100, rad, mas * 10));
                radiusParagraph.innerHTML = rad + ' thousand kilometer';
                massParagraph.innerHTML = mas + '0 000 000 000 000 000 000 tons';
            } else {
                radiusParagraph.innerHTML = 'enter number';
                massParagraph.innerHTML = 'enter number';
            }
            x = 0;
            y = 0;
            x2 = 0;
            y2 = 0;
        }
    }

    return setInterval(draw, 10);
})();

function draw(e) {
    clear();

    for (var i = 0; i < planetArray.length; i++) {
        for (var j = i; j < planetArray.length - 1; j++) {
            planetArray[i].InteractWithTheOtherPlanets(planetArray[j + 1]);
        }
    }

    for (var i = 0; i < planetArray.length; i++) {

        planetArray[i].Update();
        planetArray[i].Draw();
    }
}

function clear() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

