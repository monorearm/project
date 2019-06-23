var funcs = require("./functions.js");
var Entity = require("./entity.js")
module.exports = class Grass extends Entity {
    constructor(x, y) {
        super(x, y)
        this.array = grassArr
        this.multiply = 0

    }

    mult() {
        var cell = this.chooseCell(0)
        var empty = funcs.random(cell);
        this.multiply++
        if (empty && this.multiply > 0) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 1
            var newGr = new Grass(newX, newY)
            grassArr.push(newGr)
            grassHashiv++;
        }
    }

    next_tick() {
        if(season != 3 )
            this.mult()
    }
}
