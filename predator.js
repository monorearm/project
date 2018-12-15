var funcs = require("./functions.js");
var Entity = require("./entity.js")
module.exports = class Predator extends Entity {
    constructor(x, y) {
        super(x, y)
        this.array = predatorArr
        this.energy = 10

    }


    mult() {
        var array = this.chooseCell(0)
        var empty = array[Math.floor(Math.random() * array.length)];
        if (empty && this.energy > 15) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 3
            var pr = new Predator(newX, newY)
            predatorArr.push(pr)
        }
    }


    move() {
        this.getNewDirections();
        var freeCells = this.chooseCell(0).concat(this.chooseCell(1));
        var cell = freeCells[Math.floor(Math.random() * freeCells.length)];
        if (cell) {
            this.energy--;
            funcs.swap([this.x, this.y], cell);
        }
    }

    eat() {
        var foodNear = this.chooseCell(2).concat(this.chooseCell(5))
        var food = foodNear[Math.floor(Math.random() * foodNear.length)];
        if (food) {
            funcs.getEntityByPos(food).die();
            funcs.swap([this.x, this.y], food);
            this.energy += 3
        }
    }

    next_tick() {
        this.mult()
        this.move()
        this.eat()
        if (this.energy <= 0) {
            this.die();
        }
    }
}
