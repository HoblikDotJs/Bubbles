function newGen() {
  gen++;
  if (gen % 10 == 0) {
    console.log('Generation : ' + gen);
  }
  calculateFitness();
  for (let i = 0; i < POPULATION; i++) {
    players[i] = pickOne();
  }
  for (var i = 0; i < savedPlayers.length; i++) {
    savedPlayers[i].dispose();
  }
  savedPlayers = [];
  mapa = new Mapa();
}

function pickOne() {
  let index = 0;
  let r = random(1);
  while (r > 0) {
    r = r - savedPlayers[index].fitness;
    index++;
  }
  index--;
  let player = savedPlayers[index];
  let child = new Player(player.brain);
  child.mutate(0.1);
  return child;
}

function calculateFitness() {
  let sum = 0;
  for (let i = 0; i < savedPlayers.length; i++) {
    sum += savedPlayers[i].score;
  }

  for (let j = 0; j < savedPlayers.length; j++) {
    savedPlayers[j].fitness = savedPlayers[j].score / sum;
  }
}