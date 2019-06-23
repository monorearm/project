var funcs = require("./functions.js");
var Entity = require("./entity.js")
module.exports = class Creeper extends Entity {
    constructor(x, y) {
        super(x, y)
        this.array = creeperArr
        this.energy = 15

    }


    move() {
        this.getNewDirections();
        var freeCells = this.chooseCell(0).concat(this.chooseCell(1));
        var cell = funcs.random(freeCells);
        if (cell) {
            this.energy-=0.5;
            funcs.swap([this.x, this.y], cell);
        }
    }



    eat() {
        var cell = this.chooseCell(2).concat(this.chooseCell(3));
        var food = funcs.random(cell)
        if (food) {
            funcs.getEntityByPos(food).die();
            funcs.swap([this.x, this.y], food);
            this.energy += 2
        }
    }


    mult() {
        var cell = this.chooseCell(0)
        var empty = funcs.random(cell);
        if (empty && this.energy >= 35) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 4
            var cr = new Creeper(newX, newY)
            creeperArr.push(cr)
            creeperHashiv++;
        }
    }


    bang() {
        var damaged = this.directions
        for (var i in damaged) {
            var pos = damaged[i]
            var entity = funcs.getEntityByPos(pos);
            if (entity !== null) {
                entity.die();
                this.die();
            }
        }
    }


    next_tick() {
        this.move()
        this.eat()
        this.mult()
        if (this.energy <= 0) {
            this.die();
            this.bang()
        }
    }
}
