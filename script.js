var socket = io();
var side = 15;
var m = 64;
var n = 64;
var matrix = [];

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function setRandomColor() {
    $("body").css("background-color", getRandomColor());
}

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
                if (matrix[y][x] == 0) {
                    if (season_now == "Winter") {
                        fill("white");
                    }
                    else if (season_now == "Summer") {
                        fill("#B2F384");
                    }
                    else if (season_now == "Autumn") {
                        fill("#F3D384");
                    }
                    else {
                        fill("#FBFFBB")
                    }
                }

                else if (matrix[y][x] == 2) {
                    fill("yellow");
                }

                else if (matrix[y][x] == 3) {
                    fill("red");
                }
                else if (matrix[y][x] == 1) {
                    fill("green");
                }
                else if (matrix[y][x] == 4) {
                    fill("#003399")
                }

                else if (matrix[y][x] == 5) {
                    fill("#73480E")
                }
                rect(x * side, y * side, side, side)
                strokeWeight(0.1995)
            }
        }
    }
    let timeOfSeason = document.getElementById('timeOfSeason');
    let season_now;
    function setSeason(s) {
        let seasons = ["Spring", "Summer", "Autumn", "Winter"];
        season_now = seasons[s];
        timeOfSeason.innerHTML = "Time of season: " + season_now;
    }
}





