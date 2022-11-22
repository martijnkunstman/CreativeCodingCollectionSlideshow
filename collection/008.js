//source: https://openprocessing.org/sketch/1674531/

let boards;
const R = 1200;
const num = 500;

setup = () => {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  boards = new Boards();
};

draw = () => {
  background("black");
  boards.update();
};

const board = (angle) => ({
  x: random(-R, R),
  y: random(-R, R),
  z: random(-R, R),
  angle,
  color: color(random(256), random(256), random(256)),
});

const spin = {
  0: () => rotateX(PI / 2),
  1: () => rotateX(-PI / 2),
  2: () => rotateY(PI / 2),
  3: () => rotateY(-PI / 2),
};

class Boards {
  constructor() {
    this.boards = [];
    for (let i = 0; i < num; i++) {
      this.boards.push(board(0 | random(4)));
    }
  }

  update() {
    rotateY(frameCount / 99);
    for (const p of this.boards) {
			const c = p.color;
      push();
        translate(0, 0, -300);
        spin[p.angle]();
        translate(0, 0, 300);
        push();
          translate(p.x, p.y, p.z);
          for (let i = 0; i < 5; i++) {
						c.setAlpha(256-i*50);
						fill(c);
            plane(50);
            translate(0, 0, 50);
          }
          p.z -= 10;
          if (p.z < -R) p.z = R;
        pop();
      pop();
    }
  }
}