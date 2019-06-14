var funcs = require("./functions.js");
var Entity = require("./entity.js")
var monoremsJointEnergy = 150;
module.exports = class Monorem extends Entity {
    constructor(x, y) {
        super(x, y)
        this.array = monoremArr
    }

    move() {
        this.getNewDirections();
        var freeCells = this.chooseCell(0).concat(this.chooseCell(1));
        var cell = funcs.random(freeCells)
        // var cell = freeCells[Math.floor(Math.random() * freeCells.length)];
        if (cell) {
            monoremsJointEnergy--;
            funcs.swap([this.x, this.y], cell);
        }
    }

    eat() {
        var foodNear = this.chooseCell(1)
        // var food = foodNear[Math.floor(Math.random() * foodNear.length)];
        var food = funcs.random(foodNear)
        if (food) {
            funcs.getEntityByPos(food).die();
            funcs.swap([this.x, this.y], food);
            monoremsJointEnergy += 4
        }
    }

    mult() {
        var cell = this.chooseCell(0)
        // var empty = cell[Math.floor(Math.random() * cell.length)];
        var empty = funcs.random(cell);
        if (empty && this.energy_per_monorem >= 25) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 5
            var mo = new Monorem(newX, newY)
            monoremArr.push(mo)
        }
    }


    die() {
        monoremsJointEnergy -= this.energy_per_monorem;
        super.die();
    }

    get energy_per_monorem() {
        var monoremsCount = this.array.length;
        if (monoremsCount == 0) {
            return 0;
        }
        return monoremsJointEnergy / monoremsCount;
    }





    next_tick() {
        this.move()
        this.eat()
        this.mult()
        if (monoremsJointEnergy <= 0) {
            this.die();
        }
    }
}
