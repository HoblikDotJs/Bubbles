let mapa;
let players = [];
let savedPlayers;
let obsticles;
let gen = 0;
let diff;

//-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+//

const POPULATION = 50; // 20
const STEPS = 5; // 5
const TRACK = 16;
const R = 15;
const SEE = false;
const CPU = true;
const ROTATED = true;
const DIFFICULTY = 3;
// 1 = EASY
// 2 = MEDIUM
// 3 = HARD

//-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+//

function setup() {
  diff = constrain(DIFFICULTY, 1, 3);
  console.log(" Population size: " + POPULATION + '\n', "Number of steps in one frame is: " + STEPS + '\n', "Game is running on CPU: " + CPU + '\n', "Debug lines: " + SEE + '\n', "Track is rotated 90 deg: " + ROTATED + '\n', "Difficulty is: " + diff + '\n');
  createCanvas(windowHeight, windowHeight);
  if (CPU) {
    tf.setBackend('cpu');
  }
  mapa = new Mapa();
  savedPlayers = [];
  for (let i = 0; i < POPULATION; i++) {
    players.push(new Player());
  }
}

//-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+//
function draw() {
  background(0);
  if (ROTATED) {
    translate(width / 2, height / 2);
    rotate(-PI / 2);
    translate(-width / 2, -height / 2);
  }
  mapa.show();
  fill(255);
  for (let i = players.length - 1; i >= 0; i--) {
    players[i].show();
  }

  //-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+//

  for (let n = 0; n < STEPS; n++) {
    for (let i = players.length - 1; i >= 0; i--) {
      players[i].update();
      players[i].see();
      players[i].move();
      if (players[i].collide()) {
        savedPlayers.push(players.splice(i, 1)[0]);
        if (players.length == 0) {
          newGen();
        }
      }
    }
  }
}