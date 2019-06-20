var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);

matrix = [], grassArr = [], xotakerArr = [], predatorArr = [], creeperArr = [], monoremArr = [];
grassHashiv = 0;
xotakerHashiv = 0;
predatorHashiv = 0;
creeperHashiv = 0;
monoremHashiv = 0;

const WIDTH = 50
const HEIGHT = 50

season = 0;
var Grass = require("./modules/Grass.js");
var Xotaker = require("./modules/xotaker.js");
var Predator = require("./modules/predator.js");
var Creeper = require("./modules/creeper.js");
var Monorem = require("./modules/monorem.js");
var funcs = require("./modules/functions.js");

spawnChances = [90, 2, 2, 2, 2, 2];

function genMatrix() {
    for (var y = 0; y < HEIGHT; y++) {
        matrix[y] = []
        for (var x = 0; x < WIDTH; x++) {
            matrix[y][x] = funcs.choiceRandomId(spawnChances);
        }
    }
}
genMatrix();


for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
        if (matrix[y][x] == 1) {
            var gr = new Grass(x, y)
            grassArr.push(gr)
            grassHashiv++;
        }
        else if (matrix[y][x] == 2) {
            var xt = new Xotaker(x, y)
            xotakerArr.push(xt)
            xotakerHashiv++;
        }

        else if (matrix[y][x] == 3) {
            var pr = new Predator(x, y)
            predatorArr.push(pr)
            predatorHashiv++;
        }

        else if (matrix[y][x] == 4) {
            var cr = new Creeper(x, y)
            creeperArr.push(cr)
            creeperHashiv++;
        }

        else if (matrix[y][x] == 5) {
            var mo = new Monorem(x, y)
            monoremArr.push(mo)
            monoremHashiv++
        }


    }
}

function serverDraw() {
    var entities = [].concat(grassArr, xotakerArr, predatorArr, creeperArr, monoremArr)
    for (var i in entities) {
        var entity = entities[i]
        if (entity.alive) {
            entities[i].next_tick()
        }
    }

    let sendData = {
        matrix: matrix,
        grassCounter: grassHashiv,
        xotakerCounter: xotakerHashiv,
        predatorCounter: predatorHashiv,
        creeperCounter: creeperHashiv,
        monoremCounter: monoremHashiv
    }
    io.sockets.emit("data", sendData)
}


function changeSeason() {
    if (season == 4) {
        season = 1;
    }
    else {
        season++;
    }
    io.sockets.emit("season", season);
}


setInterval(serverDraw, 200)
setInterval(changeSeason, 6000);



