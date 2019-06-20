var socket = io();
var side = 10;
var m = 50;
var n = 50;
var matrix = [];

function setup() {
    let grassCountElement = document.getElementById('grassCount');
    let xotakerCountElement = document.getElementById('xotakerCount');
    let predatorCountElement = document.getElementById('predatorCount');
    let creeperCountElement = document.getElementById('creeperCount');
    let monoremCountElement = document.getElementById('monoremCount')


    socket.on("data", drawmatrix)
    socket.on("season", setSeason);


    function drawmatrix(data) {
        matrix = data.matrix;

        grassCountElement.innerText = data.grassCounter;
        xotakerCountElement.innerText = data.xotakerCounter;
        predatorCountElement.innerText = data.predatorCounter;
        creeperCountElement.innerText = data.creeperCounter;
        monoremCountElement.innerText = data.monoremCounter;

        createCanvas(m * side, n * side);
        background('#acacac');

        for (var y = 0; y < matrix.length; y++) {
            for (var x = 0; x < matrix[y].length; x++) {
                if (matrix[y][x] == 1) {
                    fill("green");
                }
                else if (matrix[y][x] == 2) {
                    fill("yellow");
                }

                else if (matrix[y][x] == 3) {
                    fill("red");
                }
                else if (matrix[y][x] == 0) {
                    fill("#acacac");
                }
                else if (matrix[y][x] == 4) {
                    fill("#003399")
                }

                else if (matrix[y][x] == 5) {
                    fill("white")
                }
                rect(x * side, y * side, side, side)
                strokeWeight(0.1995)
            }
        }
    }

    function setSeason(s) {
        numOfSeason = (s - 1);
        let seasons = ["Spring", "Summer", "Autumn", "Winter"];
        let timeOfSeason = document.getElementById('timeOfSeason')
        timeOfSeason.innerHTML = "Time of season: " + seasons[numOfSeason];
    }
}





