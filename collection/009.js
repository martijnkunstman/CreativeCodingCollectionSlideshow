//source: https://openprocessing.org/sketch/1708062

let trails = [];
let currentPath = [];
let x, y, breadth;

setup = () => {
  createCanvas(windowWidth, windowHeight);
	background('white');
  rectMode(CENTER);
  Init();
};

draw = () => {
  for (let i = 50; i--; ) Update();
};

mousePressed =()=>{
	background('white');
	trails.length=0;
	currentPath.length=0;
	noiseSeed();
	Init();
};

const Init = () => {
  if (currentPath.length > 0) {
    trails = trails.concat(currentPath);
  }
  x = random(width);
  y = random(height);
  breadth = random(5, 50);

  fill(color(random(256), random(256), random(256)));
  currentPath.length = 0;
};

const Update = () => {
  const n = noise(x / width, y / height);
  const angle = n * TWO_PI * 1.5;
  x += cos(angle)*2;
  y += sin(angle)*2;

  if (x < 0 || y < 0 || x > width || y > height) {
    Init();
    return;
  }

  const collide = trails.some(
    (t) => (t.x - x) ** 2 + (t.y - y) ** 2 < (t.breadth / 2 + breadth / 2) ** 2
  );
  if (collide) {
    Init();
    return;
  }

  currentPath.push({
    x: x,
    y: y,
    breadth: breadth,
  });

  push();
  translate(x, y);
  rotate(angle);
  noStroke();
  rect(0, 0, 1, 0.8 * breadth);
  stroke("black");
  rect(0, 0.4 * breadth ,1, 1);
  pop();
};
