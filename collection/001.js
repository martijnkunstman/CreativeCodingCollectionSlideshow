//source: https://openprocessing.org/sketch/1703954

let palette;
let ease, easeArray;

let grids = [];
let g;
let offset;
let angle;

p5.disableFriendlyErrors = true;

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }

function setup() {
	//createCanvas(800, 800);
    createCanvas(windowWidth, windowHeight);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
	ease = new p5.Ease();
	// print(ease.listAlgos());

	initialize();
}

function initialize() {
	angle = int(random(4)) * 360 / 4;
	palette = shuffle(random(colorScheme).colors.concat());

	offset = width / 15;
	let x = -offset;
	let y = -offset;
	let d = width + offset * 2;
	grids = [];
	while (grids.length < 150) {
		grids = [];
		separateGrid(x, y, d);
	}
	g = Object.assign({}, random(grids));
	grids = grids.sort(function(a, b) {
		// return dist(a.x, a.y, g.x, g.y) > dist(b.x, b.y, g.x, g.y) ? -1 : 1;
		// return atan2(a.y - g.y, a.x - g.x) > atan2(b.y - g.y, b.x - g.x) ? -1 : 1;
	});
	easeArray = ease.fillArray("backInOut", int(grids.length / 2));
	reverse(easeArray);
}

function draw() {
	blendMode(BLEND);
	background(0, 0, 5);
	blendMode(ADD);

	push();
	translate(width / 2, height / 2);
	rotate(angle);
	translate(-width / 2, -height / 2);
	for (let i = 0; i < grids.length; i++) {
		let obj = grids[i];
		noStroke();
		push();
		translate(obj.x, obj.y);
		fill(0, 0, 100, 0);
		rectMode(CENTER);
		rect(0, 0, obj.w, obj.w);
		// drawingContext.clip();
		rotate(obj.angle);
		translate(-obj.w / 2, -obj.w / 2);
		let d = obj.w * easeArray[int(i + frameCount) % easeArray.length];
		fill(obj.c);
		rectMode(CORNER);
		switch (obj.shape) {
			case "rect":
				rect(0, 0, d, obj.w);
				break;
			case "circle":
				ellipse(0, 0, d, d);
				break;
			case "arc":
				arc(0, 0, d, d, 0, 90, PIE);
				break;
			case "triangle":
				triangle(0, 0, d, 0, 0, d);
				break;
		}
		pop();
	}

	let n = noise(g.x / width * 3, g.y / height * 3, frameCount / width * 3) * 360 / 10;
	g.x = width / 2 + cos(n + frameCount / 3.2 * 4) * width / 4;
	g.y = height / 2 + sin(n + frameCount / 5.3 * 7) * height / 4;
	g.x = constrain(g.x, offset * 2, width - offset * 2);
	g.y = constrain(g.y, offset * 2, height - offset * 2);

	push();
	fill(0, 0, 100);
	drawingContext.shadowColor = color(0, 0, 100);
	drawingContext.shadowBlur = width / 10;
	circle(g.x, g.y, n / 36 * 150);
	circle(g.x, g.y, n / 36 * 150);
	pop();
	for (let obj of grids) {
		obj.x += 3;
		if (obj.x > width + offset) obj.x = -offset;

	}
	grids = grids.sort(function(a, b) {
		a.angle = atan2(a.y - g.y, a.x - g.x);
		return dist(a.x, a.y, g.x, g.y) > dist(b.x, b.y, g.x, g.y) ? -1 : 1;
		// return atan2(a.y - g.y, a.x - g.x) > atan2(b.y - g.y, b.x - g.x) ? -1 : 1;
	});

	// if (g.x < 0) g.x += width;
	// if (g.x > width) g.x -= width;
	// if (g.y < 0) g.y += width;
	// if (g.y > height) g.y -= height;

	pop();
	if (frameCount % (easeArray.length * 4) == 0) {
		initialize();
	}
	// noLoop();
}

function separateGrid(x, y, d) {
	let sepNum = int(random(2, 6));
	let w = d / sepNum;

	for (let i = x; i < x + d - 1; i += w) {
		for (let j = y; j < y + d - 1; j += w) {
			if (random(100) < 95 && w > width / 5) {
				separateGrid(i, j, w);
			} else {
				grids.push({
					x: i + w / 2,
					y: j + w / 2,
					w: w,
					c: random(palette),
					angle: (int(random(4)) * 360) / 4,
					shape: random(["rect", "circle", "arc", "triangle"]),
				});
			}
		}
	}
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