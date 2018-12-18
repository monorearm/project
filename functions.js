const WIDTH = 50
const HEIGHT = 50
function getArrayById(id) {
    if (id == 0) {
        return null
    }
    var arrays = [grassArr, xotakerArr, predatorArr, creeperArr, monoremArr];
    return arrays[id - 1];
}
exports.getArrayById = getArrayById

function isPosCorrect(pos) {
    return (0 <= pos[0] && pos[0] < WIDTH && 0 <= pos[1] && pos[1] < HEIGHT);
}
exports.isPosCorrect = isPosCorrect;

function getEntityByPos(pos) {
    if (!isPosCorrect(pos)) {
        return null;
    }
    var x = pos[0];
    var y = pos[1];
    var kindId = matrix[y][x];
    var array = getArrayById(kindId);
    if (array === null) {
        return null;
    }
    for (var i in array) {
        var entity = array[i];
        if (entity.x == x && entity.y == y) {
            return entity;
        }
    }
}

exports.getEntityByPos = getEntityByPos;


function swap(pos1, pos2) {
    var [[x1, y1], [x2, y2]] = [pos1, pos2];
    var entity1 = getEntityByPos(pos1)
    var entity2 = getEntityByPos(pos2)

    if (entity1 !== null) {
        [entity1.x, entity1.y] = pos2
    }

    if (entity2 !== null) {
        [entity2.x, entity2.y] = pos1
    }

    var id1 = matrix[y1][x1]
    var id2 = matrix[y2][x2]

    matrix[y1][x1] = id2;
    matrix[y2][x2] = id1
}

exports.swap = swap;

function choiceRandomId(spawnChances) {
    var chancesSum = spawnChances.reduce((a, b) => a + b);
    var seed = Math.random() * chancesSum;
    var passedChancesSum = 0;
    for (var id in spawnChances) {
        passedChancesSum += spawnChances[id];
        if (passedChancesSum > seed) {
            return id;
        }
    }
}

exports.choiceRandomId = choiceRandomId;


