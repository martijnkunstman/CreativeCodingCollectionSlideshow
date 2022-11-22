//source: https://openprocessing.org/sketch/1693953/

// Inspired by Paul Bourke (http://paulbourke.net/fractals/sinjulia/)
// Reference: http://negativespace.net/art/julia-set-sinz
const a = 1;
const b = 0.2;
const julia = (x, y) => {
  for (iter = 0; iter < 100; iter++) {
    let u = sin(x) * Math.cosh(y);
    let v = cos(x) * Math.sinh(y);
    x = a * u - b * v;
    y = b * u + a * v;
    if (abs(y) > 50) return iter;
  }
  return 0;
};

let maxx, maxy;
setup = () => {
  createCanvas(windowWidth, windowHeight);
  let avr = sqrt(width * height);
  maxx = (avr / height) * PI;
  maxy = (avr / width) * PI;
};

yy = 0;
draw = () => {
  if (yy < height) {
    const y = map(yy, 0, height, -maxy, maxy);
    for (let xx = width; xx--; ) {
      const x = map(xx, 0, width, -maxx, maxx);
      const iter = julia(x, y);
      const r= sin(iter/12)**2*256
      const g= (15000 / iter) % 256
      const b= (25000 / log(iter)) % 256
			
      stroke(r,g,b);
      line(xx, yy, xx, yy + iter);
    }
    yy++;
  }
};
