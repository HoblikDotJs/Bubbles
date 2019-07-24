class Mapa {
  constructor() {
    obsticles = [];
    let my = [];
    let noiseT = 1;
    for (let i = 0; i <= width; i += width / TRACK) {
      if (diff == 3) {
        my[i] = random(-width / 10, width / 10);
      } else if (diff == 2) {
        my[i] = random(-width / 20, width / 20);
      } else if (diff == 1) {
        my[i] = map(noise(noiseT), 0, 1, -width / 20, width / 20);
        noiseT += 10;
      }
    }
    for (let i = width; i >= 0; i -= width / TRACK) {
      if (i == 0) {
        obsticles.push([0, 450]);
      } else {
        obsticles.push([i, 400 - my[i] + 100]);
      }
    }
    for (let i = 0; i <= width; i += width / TRACK) {
      if (i == 0) {
        obsticles.push([0, 350]);
      } else {
        obsticles.push([i, 400 - my[i]]);
      }
    }
  }

  show() {
    stroke(0);
    strokeWeight(3);
    beginShape();
    fill(42, 41, 34);
    for (let i = 1; i < obsticles.length; i++) {
      vertex(obsticles[i - 1][0], obsticles[i - 1][1]);
      vertex(obsticles[i][0], obsticles[i][1]);
    }
    endShape();
  }
}