//source: https://openprocessing.org/sketch/1720271

let t = 0;

function setup() {
	createCanvas(windowWidth, windowHeight);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
}

function draw() {
	blendMode(BLEND);
	background(0, 0, 0);
	blendMode(ADD);
	randomSeed(1000);
	let r_max = 300;
	let r_step = 5;
	//drawingContext.shadowColor = color(0,0,0,33);
	//drawingContext.shadowBlur = 5;

	stroke(0, 0, 100, 80);
	for (let i = 0; i < 2; i++) {
		for (let r = r_max; r > r_max / 10; r -= r_max / r_step) {
			let r2 = r * sin(i * 90 + (r / r_max) * 90 + t);
			push();
			translate(
				width / 2 + (cos((r / r_max) * 90 + t) * r) / 10,
				height / 2 + (sin((r / r_max) * 90 + t) * r) / 10
			);
			rotate(t / 10);
			shearX(cos(i * 90 + r2 + t) * 5);
			shearY(sin(i * 90 + r2 - t) * 5);
			let step = random([2, 3, 4, 6, 8, 12, 16, 32]);
			let angle_step = 360 / step;
			let R = (2 * PI * r * angle_step) / 360;
			for (let angle = 0; angle < 360; angle += angle_step) {
				push();
				shearX(sin(angle + r2 - t) * 5);
				shearY(cos(angle + r2 + t) * 5);
				let direction = random() * 2 * (random() > 0.5 ? -1 : 1);
				noFill();
				drawingContext.setLineDash([R / 8 / int(random(1, 4))]);
				drawingContext.lineDashOffset = angle + r + t * direction;
				strokeWeight(
					r_max / r_step / 2 +
					(sin(angle * direction + r2 + direction * t) * r_max) /
					r_step /
					2
				);
				strokeCap(SQUARE);
				arc(0, 0, r * 2, r * 2, angle, angle + angle_step);
				direction *= -1;
				pop();
			}
			pop();
		}
	}
	t++;
}