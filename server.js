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
const WIDTH = 50
const HEIGHT = 50


var Grass = require("./Grass.js");
var Xotaker = require("./xotaker.js");
var Predator = require("./predator.js");
var Creeper = require("./creeper.js");
var Monorem = require("./monorem.js");
var funcs = require("./functions.js");



for (var y = 0; y < WIDTH; y++) {
    matrix[y] = []
    var a = Math.floor(Math.random() * 6);
    for (var x = 0; x < HEIGHT; x++) {
        matrix[y][x] = a;
    }
}


for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
        if (matrix[y][x] == 1) {
            var gr = new Grass(x, y)
            grassArr.push(gr)
        }
        else if (matrix[y][x] == 2) {
            var xt = new Xotaker(x, y)
            xotakerArr.push(xt)
        }

        else if (matrix[y][x] == 3) {
            var pr = new Predator(x, y)
            predatorArr.push(pr)
        }

        else if (matrix[y][x] == 4) {
            var cr = new Creeper(x, y)
            creeperArr.push(cr)
        }

        else if (matrix[y][x] == 5) {
            var mo = new Monorem(x, y)
            monoremArr.push(mo)
        }


    }
}





setInterval(drawServerayin, 1000)
function drawServerayin() {
    var entities = [].concat(grassArr, xotakerArr, predatorArr, creeperArr, monoremArr)
    for (var i in entities) {
        var entity = entities[i]
        if (entity.alive) {
            entities[i].next_tick()
        }
    }
    
}
console.log(matrix)
io.on("connection", function (socket) {
    io.sockets.emit("matrix", matrix)
});




