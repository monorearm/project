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
        if (cell) {
            monoremsJointEnergy--;
            funcs.swap([this.x, this.y], cell);
        }
    }

    eat() {
        var foodNear = this.chooseCell(1)
        var food = funcs.random(foodNear)
        if (food) {
            funcs.getEntityByPos(food).die();
            funcs.swap([this.x, this.y], food);
            monoremsJointEnergy += 2
        }
    }

    mult() {
        var cell = this.chooseCell(0)
        var empty = funcs.random(cell);
        if (empty && this.energy_per_monorem >= 50) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 5
            var mo = new Monorem(newX, newY)
            monoremArr.push(mo)
            monoremHashiv++;
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
        if(season != 0){
            this.mult()
        }
       
        if (monoremsJointEnergy <= 0) {
            this.die();
        }
    }
}
