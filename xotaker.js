var funcs = require("./functions.js");
var Entity = require("./entity.js")
module.exports = class Xotaker extends Entity {
    constructor(x, y) {
        super(x, y)
        this.array = xotakerArr
        this.energy = 5
    }


    mult() {
        var array = this.chooseCell(0)
        var empty = array[Math.floor(Math.random() * array.length)];
        if (empty && this.energy > 10) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 2
            var xt = new Xotaker(newX, newY)
            xotakerArr.push(xt)

        }
    }

    move() {
        this.getNewDirections();
        var array = this.chooseCell(0)
        var empty = array[Math.floor(Math.random() * array.length)];
        if (empty) {
            this.energy--;
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 2
            matrix[this.y][this.x] = 0

            this.x = newX
            this.y = newY
        }
    }

    eat() {
        var array = this.chooseCell(1)
        var food = array[Math.floor(Math.random() * array.length)];
        if (food) {
            funcs.getEntityByPos(food).die();
            funcs.swap([this.x, this.y], food);
            this.energy += 2
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