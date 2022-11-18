let palette;
let ease;
let grids;
let cam;
let offset, x_min, x_max, y_min, y_max;
let light_arr;

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
	smooth();

	light_arr = [
		color(0, 100, 100, 100),
		color(220, 100, 100, 100),
		color(30, 100, 100, 50)
	];
	shuffle(light_arr, true);
	offset = width / 8;
	x_min = offset;
	y_min = offset;
	x_max = width - offset;
	y_max = height - offset;

	palette = shuffle(random(colorScheme).colors.concat());
	grids = createGrid(x_min, y_min, x_max, y_max, 1 / 50, 1 / 7);
	ease = new p5.Ease();
	ortho(-width / 2, width / 2, -height / 2, height / 2, -5000, 5000);

	let a = 30;
	let b = -60;

	let cx = cos(a) * cos(b) * 150;
	let cy = sin(a) * cos(b) * 150;
	let cz = sin(b) * 150;

	cam = createCamera(cx, cy, cz);
	cam.setPosition(cx, cy, cz);
	cam.lookAt(0, 0, 0);

}

function draw() {
	blendMode(BLEND);
	background(0, 0, 20);

	if (frameCount % 250 == 0) {
		grids = createGrid(x_min, y_min, x_max, y_max, 1 / 50, 1 / 7);
		reverse(grids);
		shuffle(light_arr, true);
	
	}
	directionalLight(light_arr[0], 0, 0, 1);
	directionalLight(light_arr[1], -1, 0, 0);
	directionalLight(light_arr[2], 0, -1, 0);
	ambientLight(color(0,0,80));
	
	scale(0.95);

	orbitControl();
	translate(-width / 2, -height / 2, 0);
	let n = 0;
	for (let grid of grids) {
		let v = ((frameCount / 1.5 + n / 3) / grids.length) % 1;
		n++;
		let v2 = ease.elasticOut(v * v);
		let v3 = ease.elasticOut(v);
		push();
		translate(grid.x + grid.w / 2, grid.y + grid.h / 2, -10 * grid.d * (1 - v2));
		grid.rotate(v2 * 360 * (n % 2 == 0 ? -1 : 1));
		scale(ease.elasticInOut(v) * 0.8);
		rectMode(CENTER);
		fill(grid.color);
		// fill(0,0,50);
		stroke(0, 0, 20);
		box(grid.w, grid.h, grid.d);
		pop();
	}

	// print(grids);
	// noLoop();
}

function createGrid(x1, y1, x2, y2, min_ratio, max_ratio) {
	let grid = [];
	let isVertical = random() > 0.5;
	let x_size = x2 - x1;
	let y_size = y2 - y1;
	// random() > 0.5;
	let x, y, x_step, y_step;
	if (isVertical) {
		x = x1;
		while (x < x2) {
			palette = shuffle(random(colorScheme).colors.concat());

			x_step = random(x_size * min_ratio, x_size * max_ratio);
			if (x + x_step > x2) x_step = x2 - x;
			y = y1;
			while (y < y2) {
				y_step = random(y_size * min_ratio, y_size * max_ratio);
				if (y + y_step > y2) y_step = y2 - y;
				let obj = {
					x: x,
					y: y,
					w: x_step,
					h: y_step,
					d: 100,
					rotate: random([rotateX, rotateY, rotateZ]),
					color: random(palette),
				};
				grid.push(obj);
				y += y_step;
			}
			x += x_step;
		}
	} else {
		y = y1;
		while (y < y2) {
			palette = shuffle(random(colorScheme).colors.concat());
			y_step = random(y_size * min_ratio, y_size * max_ratio);
			if (y + y_step > y2) y_step = y2 - y;
			x = x1;
			while (x < x2) {
				x_step = random(x_size * min_ratio, x_size * max_ratio);
				if (x + x_step > x2) x_step = x2 - x;
				let obj = {
					x: x,
					y: y,
					w: x_step,
					h: y_step,
					d: 100,
					rotate: random([rotateX, rotateY, rotateZ]),
					color: random(palette),
				};
				grid.push(obj);
				x += x_step;
			}
			y += y_step;
		}
	}

	return grid;
}

let colorScheme = [{
		name: "Benedictus",
		colors: ["#F27EA9", "#366CD9", "#5EADF2", "#636E73", "#F2E6D8"],
	},
	{
		name: "Cross",
		colors: ["#D962AF", "#58A6A6", "#8AA66F", "#F29F05", "#F26D6D"],
	},
	{
		name: "Demuth",
		colors: ["#222940", "#D98E04", "#F2A950", "#BF3E21", "#F2F2F2"],
	},
	{
		name: "Hiroshige",
		colors: ["#1B618C", "#55CCD9", "#F2BC57", "#F2DAAC", "#F24949"],
	},
	{
		name: "Hokusai",
		colors: ["#074A59", "#F2C166", "#F28241", "#F26B5E", "#F2F2F2"],
	},
	{
		name: "Hokusai Blue",
		colors: ["#023059", "#459DBF", "#87BF60", "#D9D16A", "#F2F2F2"],
	},
	{
		name: "Java",
		colors: ["#632973", "#02734A", "#F25C05", "#F29188", "#F2E0DF"],
	},
	{
		name: "Kandinsky",
		colors: ["#8D95A6", "#0A7360", "#F28705", "#D98825", "#F2F2F2"],
	},
	{
		name: "Monet",
		colors: ["#4146A6", "#063573", "#5EC8F2", "#8C4E03", "#D98A29"],
	},
	{
		name: "Nizami",
		colors: ["#034AA6", "#72B6F2", "#73BFB1", "#F2A30F", "#F26F63"],
	},
	{
		name: "Renoir",
		colors: ["#303E8C", "#F2AE2E", "#F28705", "#D91414", "#F2F2F2"],
	},
	{
		name: "VanGogh",
		colors: ["#424D8C", "#84A9BF", "#C1D9CE", "#F2B705", "#F25C05"],
	},
	{
		name: "Mono",
		colors: ["#D9D7D8", "#3B5159", "#5D848C", "#7CA2A6", "#262321"],
	},
	{
		name: "RiverSide",
		colors: ["#906FA6", "#025951", "#252625", "#D99191", "#F2F2F2"],
	},
];