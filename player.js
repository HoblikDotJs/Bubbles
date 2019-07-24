class Player {
  constructor(brain) {
    this.r = 16;
    this.counter = 0;
    this.coll = false;
    this.pos = createVector(10, 400);
    this.vel = createVector();
    this.score = 0;
    this.fitness = 0;
    if(brain){
      this.brain = brain.copy();
    }else{
      this.brain = new NeuralNetwork(R, 5, 2);
    }
  }

  mutate(r){
    this.brain.mutate(r);
  }

  dispose(){
    this.brain.dispose();
  }

  move() {
    let outputs = this.brain.predict(this.inputs);
    this.vel.x = map(outputs[0], 0, 1, -2,2);
    this.vel.y = map(outputs[1], 0, 1, -2,2);
    if(this.counter > width*25){
      this.coll = true;
    }
  }

  show() {
    strokeWeight(2);
    fill(255,50);
    stroke(255,100)
    ellipse(this.pos.x, this.pos.y, this.r, this.r);
  }

  update() {
    this.pos.add(this.vel);
    this.counter++;
  }

  see() {
    let di;
    let pt;
    this.inputs = [];
    this.s = [107];
    for (let k = 0; k < R; k++){
      for (let i = 1; i < obsticles.length; i++) {
        pt = collideLineLine(this.pos.x, this.pos.y, this.pos.x + 100, this.pos.y - 40 + (k * 20), obsticles[i][0], obsticles[i][1], obsticles[i-1][0], obsticles[i-1][1], true);
        di = dist(pt.x, pt.y, this.pos.x, this.pos.y);
        if(pt.x && pt.y != 0 && SEE){
        line(pt.x,pt.y,this.pos.x,this.pos.y);
      }
        this.s[i] = constrain(di, 0, 200);
        this.inputs[k] = map(floor(min(this.s)),0,200,1,0);
      }
    }
  }

  collide() {
    for (let i = 1; i < obsticles.length; i++) {
      if ((this.vel.x < 0.1 && this.vel.y < 0.1) || this.coll || collideLineCircle(obsticles[i][0], obsticles[i][1], obsticles[i-1][0], obsticles[i-1][1], this.pos.x, this.pos.y, this.r)) {
        this.score = this.pos.x;
        return true;
      }
    }

    if (this.pos.x >= width) {
      console.log("DONE!!");
      this.score = this.pos.x;
      this.score += 1000;
      this.coll = true;
    }
  }
}
