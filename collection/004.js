// Inspired by Sage Jenson (https://cargocollective.com/sagejenson/physarum)
/*
OPC.button('rtg', 'Return to Origin');
buttonPressed = (variableName, value) => {
	if (variableName === 'rtg') {
		ants.init();
	}
}
*/

const antColor = new Uint8Array([255, 255, 255]);
const antsNum = 2750;
const sensorOffset = 20;
const clockwise = 30;
const counter = -30;

setup = () => {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  pixelDensity(1);
  background(0); // Initialize trail
  ants.init();
};

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }

draw = () => {
  background(0, 5); // Update trail

  stroke(255);
  strokeWeight(30);
  mouseIsPressed && line(pmouseX, pmouseY, mouseX, mouseY);

  loadPixels();
  for (let i = 2; i--; ) {
    ants.updateAngle();
    ants.updatePosition();
  }
  updatePixels();
};

const ant = () => ({
  x: width / 2,
  y: height / 2,
  angle: random(360),
  step: random(2, 3),
});

const ants = {
  ants: [],

  init() {
    this.ants.length = 0;
    for (let i = antsNum; i--; ) this.ants.push(ant());
  },

  smell(a, d) {
    const aim = a.angle + d;
    let x = 0 | (a.x + sensorOffset * cos(aim));
    let y = 0 | (a.y + sensorOffset * sin(aim));
    x = (x + width) % width;
    y = (y + height) % height;

    const index = (x + y * width) * 4;
    return pixels[index]; // Only get red channel
  },

  updateAngle() {
    for (const a of this.ants) {
      const right = this.smell(a, clockwise),
        center = this.smell(a, 0),
        left = this.smell(a, counter);

      if (center > left && center > right) {
        /* Carry on straight */
      } else if (left < right) a.angle += clockwise;
      else if (left > right) a.angle += counter;
    }
  },

  updatePosition() {
    for (const a of this.ants) {
      a.x += cos(a.angle) * a.step;
      a.y += sin(a.angle) * a.step;
      a.x = (a.x + width) % width;
      a.y = (a.y + height) % height;

      const index = ((0 | a.x) + (0 | a.y) * width) * 4;
      pixels.set(antColor, index);
    }
  },
};