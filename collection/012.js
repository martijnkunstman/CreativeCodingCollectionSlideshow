let penx = 0;
let peny = 0;
let de = 2;
let lista
let el0 = 0;

let by;

// ------------------------------------------------------------

function setup() { 
    createCanvas(800, 600);
    //  size(1024, 768);
    //  size(screen.width, screen.height);
    smooth();
    frameRate(60);
    colorMode(HSB, 1);
    ellipseMode(CENTER);
    stroke(0, 0, 0, 0.7);
    background(0, 0, 1);
    //  strokeWeight(0.3 * de + 1);
    strokeWeight(2);

    lista = new cLista();
    city();
}

// ------------------------------------------------------------

function draw() {
  let t = 0;
  while((t++ < 50) && (el0 < lista.nr)) {
    lista._draw(el0++);
  }
  if (el0 == lista.nr) {
    noLoop();
  }
}

// ------------------------------------------------------------

function mouseClicked() {
  lista.nr = 0;
  el0 = 0;
  city();
  background(0, 0, 1);
  loop();
}

// ------------------------------------------------------------

function keyPressed()
{
  if( key == 's') {
    save("city.tif");
  }
}

// ------------------------------------------------------------

function city() {

  // cielo nero
//  rettf(0, 0, width, ~~(0.95*height));
  // luna
  let rag = height / 10;
  lista.agg(0, random(rag, width-rag), random(0.3*height, 0.5*height-rag));
  lista.agg(6, rag, 0);

  // strade
  let p1;
  let p2;
  p1 = proietta(createVector(-10, 0, 240));
  p2 = proietta(createVector(-10, 0, -60));
  lineav(p1, p2);
  p1 = proietta(createVector(-20, 0, 240));
  p2 = proietta(createVector(-20, 0, -60));
  lineav(p1, p2);
  p1 = proietta(createVector(-40, 0, -5));
  p2 = proietta(createVector(240, 0, -5));
  lineav(p1, p2);
  p1 = proietta(createVector(-40, 0, -15));
  p2 = proietta(createVector(240, 0, -15));
  lineav(p1, p2);

  palazzo(createVector(40, 0, 80));
  palazzo(createVector(40, 0, 40));
  for(let z=9; z>0; z--) {
    palazzo(createVector(0, 0, z*40));
  }
  for(let x=6; x>=0; x--) {
    palazzo(createVector(x*40, 0, 0));
  }

  // alberi
  for(let x=220; x>=0; x-=40) {
    albero(createVector(x, 0, -2));
    albero(createVector(-2, 0, x));
  }

  // semafori
  semaforox(createVector( 0, 0, 162));
  semaforox(createVector( 0, 0,  82));
  semaforox(createVector( 0, 0,   2));
  semaforoz(createVector(82, 0,   0));
  semaforoz(createVector( 2, 0,   0));
  
  palazzo(createVector(0, 0, -53));
}

// ------------------------------------------------------------

function proietta(pt) {
  let d = 60.00;
  let h = 1.50;  
  let alfa = radians(30);
  
  let a = pt.x * sin(alfa) - pt.z * cos(alfa);
  let b = pt.x * cos(alfa) + pt.z * sin(alfa);
  let x = d * a / (b + d);
  let y = d * (pt.y - h) / (b + d);
  
  let sc = height / 90;
  return createVector(0.63*width + sc*x, 0.95*height - sc*y);
}

// ------------------------------------------------------------

function palazzo(pt) {  
  let tipo = ~~(random(10));  
  let h = ~~(random(50, 100));
  let insegne = false;
  switch (tipo) {
    case 0:
      box3d(createVector(pt.x+20, h, pt.z+10), createVector(pt.x+21, h+random(20, 40), pt.z+11));
      box3d(createVector(pt.x+10, h, pt.z+10), createVector(pt.x+11, h+random(20, 40), pt.z+11));
      rettangolo_bianco(createVector(pt.x, h, pt.z), createVector(pt.x+30, h, pt.z), createVector(pt.x+30, h, pt.z+30), createVector(pt.x, h, pt.z+30));
      box3d(createVector(pt.x, 20, pt.z), createVector(pt.x+30, h-4, pt.z+30));
      for (let fi=30-3; fi>0; fi-=3) {
        lineav(proietta(createVector(pt.x, 20, pt.z+fi)), proietta(createVector(pt.x, h-4, pt.z+fi)));
        lineav(proietta(createVector(pt.x+fi, 20, pt.z)), proietta(createVector(pt.x+fi, h-4, pt.z)));
      }
      box3d(pt, createVector(pt.x+30, 19, pt.z+30));
      insegne = true;
      break;
    case 1:
      let nr = ~~(random(5, 20));
      for (let i=nr-1; i>=0; i--) {
        box3d(createVector(pt.x, i*4+4, pt.z), createVector(pt.x+30, i*4+6, pt.z+30));
      }
      pilotis(pt, 30, 30, 4);
      insegne = true;
      break;
    case 2:
      box3d(createVector(pt.x+1, h-10, pt.z+1), createVector(pt.x+29, h, pt.z+29));
      box3d(createVector(pt.x+ 2, 10, pt.z+22), createVector(pt.x+ 4, h-10, pt.z+28));
      box3d(createVector(pt.x+22, 10, pt.z+ 2), createVector(pt.x+28, h-10, pt.z+ 4));
      box3d(createVector(pt.x+ 4, 10, pt.z+ 4), createVector(pt.x+22, h-10, pt.z+22));
      box3d(createVector(pt.x+ 2, 10, pt.z+ 2), createVector(pt.x+ 8, h-10, pt.z+ 8));
      basamento(pt, 10);
      insegne = true;
      break;
    case 3:
      box3d(createVector(pt.x+14.5, h, pt.z+14.5), createVector(pt.x+15.5, h+40, pt.z+15.5));
      if (h > 50) box3d(createVector(pt.x+2, 50, pt.z+2), createVector(pt.x+28, h, pt.z+28));
      if (h > 50) box3d(createVector(pt.x+4, 42, pt.z+4), createVector(pt.x+26, 50, pt.z+26));
      if (h > 42) box3d(createVector(pt.x+2, 16, pt.z+2), createVector(pt.x+28, 42, pt.z+28));
      if (h > 16) box3d(createVector(pt.x+4, 12, pt.z+4), createVector(pt.x+26, 16, pt.z+26));
      if (h > 12) basamento(pt, 12);
      insegne = true;
      break;
    case 4:
      cilindro3d(createVector(pt.x, 31, pt.z), h-16, 32, 13, true);
      cilindro3d(createVector(pt.x, 26, pt.z),    4, 32, 13, true);
      cilindro3d(createVector(pt.x, 21, pt.z),    4, 32, 13, true);
      cilindro3d(createVector(pt.x, 16, pt.z),    4, 32, 13, true);
      cilindro3d(createVector(pt.x, 12, pt.z),    4, 32, 11, true);
      cilindro3d(createVector(pt.x,  0, pt.z),   12, 32, 15, false);
      break;
    case 5:
      cilindro3d(createVector(pt.x, h-2, pt.z), 2, 8, 13, true);
      cilindro3d(createVector(pt.x, h-6, pt.z), 4, 8, 9, true);
      cilindro3d(createVector(pt.x, 8, pt.z), h-14, 8, 13, true);
      basamento(pt, 8);
      insegne = true;
      break;
    case 6: // giardino
      box3d(pt, createVector(pt.x+30, pt.y+1, pt.z+30));
      for (let i=0; i<10; i++) {
        let pz = map(i, 0, 10, 0, 22);
        let px = random(0, pz);
        let pt0 = createVector(pt.x+26-px, pt.y+1, pt.z+26-pz+px);
        albero(pt0);
      }
      break;
    case 7:
      box3d(createVector(pt.x+5, 32, pt.z+5), createVector(pt.x+25, h, pt.z+25));
      box3d(createVector(pt.x+10, 26, pt.z+10), createVector(pt.x+20, 32, pt.z+20));
      box3d(createVector(pt.x+5, 26, pt.z+24), createVector(pt.x+5, 32, pt.z+25));
      box3d(createVector(pt.x+5, 26, pt.z+18), createVector(pt.x+5, 32, pt.z+19));
      box3d(createVector(pt.x+5, 26, pt.z+11), createVector(pt.x+5, 32, pt.z+12));
      box3d(createVector(pt.x+24, 26, pt.z+5), createVector(pt.x+25, 32, pt.z+6));
      box3d(createVector(pt.x+18, 26, pt.z+5), createVector(pt.x+19, 32, pt.z+6));
      box3d(createVector(pt.x+11, 26, pt.z+5), createVector(pt.x+12, 32, pt.z+6));
      box3d(createVector(pt.x+ 5, 26, pt.z+5), createVector(pt.x+ 6, 32, pt.z+6));
      cilindro3d(createVector(pt.x, 6, pt.z), 20, 25, 15, false);
      box3d(createVector(pt.x+10, 0, pt.z+10), createVector(pt.x+20, 6, pt.z+20));
      box3d(createVector(pt.x+5, 0, pt.z+24), createVector(pt.x+5, 6, pt.z+25));
      box3d(createVector(pt.x+5, 0, pt.z+18), createVector(pt.x+5, 6, pt.z+19));
      box3d(createVector(pt.x+5, 0, pt.z+11), createVector(pt.x+5, 6, pt.z+12));
      box3d(createVector(pt.x+24, 0, pt.z+5), createVector(pt.x+25, 6, pt.z+6));
      box3d(createVector(pt.x+18, 0, pt.z+5), createVector(pt.x+19, 6, pt.z+6));
      box3d(createVector(pt.x+11, 0, pt.z+5), createVector(pt.x+12, 6, pt.z+6));
      box3d(createVector(pt.x+ 5, 0, pt.z+5), createVector(pt.x+ 6, 6, pt.z+6));
      insegne = true;
      break;
    case 8:
      box3d(createVector(pt.x+2, 6, pt.z+2), createVector(pt.x+18, h-10, pt.z+18));
      box3d(createVector(pt.x, 0, pt.z+23), createVector(pt.x+2, h  , pt.z+28));
      box3d(createVector(pt.x, 0, pt.z+18), createVector(pt.x+2, h-5, pt.z+23));
      box3d(createVector(pt.x, 0, pt.z+ 7), createVector(pt.x+2, h-5, pt.z+12));
      box3d(createVector(pt.x, 0, pt.z+ 2), createVector(pt.x+2, h  , pt.z+ 7));
      box3d(createVector(pt.x+23, 0, pt.z), createVector(pt.x+28, h  , pt.z+2));
      box3d(createVector(pt.x+18, 0, pt.z), createVector(pt.x+23, h-5, pt.z+2));
      box3d(createVector(pt.x+ 7, 0, pt.z), createVector(pt.x+12, h-5, pt.z+2));
      box3d(createVector(pt.x+ 2, 0, pt.z), createVector(pt.x+ 7, h  , pt.z+2));
      insegne = true;
      break;
    case 9:
      cilindro3d(createVector(pt.x, 0, pt.z), h, 32, 11, true);
      box3d(createVector(pt.x, 0, pt.z+15), createVector(pt.x+4, h, pt.z+30));
      box3d(createVector(pt.x+15, 0, pt.z), createVector(pt.x+30, h, pt.z+4));
      insegne = true;
      break;
  }
  
  if (insegne) {
    let iw = random(1, 1.5);
    let ih = random(2, 10);
    let ipos = random(2, 14);
    rettangolo_bianco(createVector(pt.x+ipos, 4, pt.z-1), createVector(pt.x+ipos, 4+ih, pt.z-1), createVector(pt.x+ipos, 4+ih, pt.z-1-iw), createVector(pt.x+ipos, 4, pt.z-1-iw));
    iw = random(1, 1.5);
    ih = random(2, 10);
    ipos = random(2, 14) + 15;
    rettangolo_bianco(createVector(pt.x+ipos, 4, pt.z-1), createVector(pt.x+ipos, 4+ih, pt.z-1), createVector(pt.x+ipos, 4+ih, pt.z-1-iw), createVector(pt.x+ipos, 4, pt.z-1-iw));
    iw = random(1, 1.5);
    ih = random(2, 10);
    ipos = random(2, 14);
    rettangolo_bianco(createVector(pt.x-1, 4, pt.z+ipos), createVector(pt.x-1, 4+ih, pt.z+ipos), createVector(pt.x-1-iw, 4+ih, pt.z+ipos), createVector(pt.x-1-iw, 4, pt.z+ipos));
    iw = random(1, 1.5);
    ih = random(2, 10);
    ipos = random(2, 14) + 15;
    rettangolo_bianco(createVector(pt.x-1, 4, pt.z+ipos), createVector(pt.x-1, 4+ih, pt.z+ipos), createVector(pt.x-1-iw, 4+ih, pt.z+ipos), createVector(pt.x-1-iw, 4, pt.z+ipos));
  }
}

// ------------------------------------------------------------

function basamento(pt, h) {
  let nr1 = ~~(random(1, 5));
  let nr2 = ~~(random(1, 5));
  let leter1 = 27.0 / nr1;
  let leter2 = 27.0 / nr2;
  box3d(pt, createVector(pt.x+30, h, pt.z+30));
  rettangolo_rigato(createVector(pt.x, 6, pt.z+2), createVector(pt.x, h-2, pt.z+2), createVector(pt.x, h-2, pt.z+28), createVector(pt.x, 6, pt.z+28));
  for (let i=0; i<nr1; i++) {
    rettangolo_rigato(createVector(pt.x, 0, pt.z+2+i*leter1), createVector(pt.x, 4, pt.z+2+i*leter1), createVector(pt.x, 4, pt.z+1+(i+1)*leter1), createVector(pt.x, 0, pt.z+1+(i+1)*leter1));
  }
  rettangolo_nero(createVector(pt.x+2, 6, pt.z), createVector(pt.x+2, h-2, pt.z), createVector(pt.x+28, h-2, pt.z), createVector(pt.x+28, 6, pt.z));
  for (let i=0; i<nr2; i++) {
    rettangolo_nero(createVector(pt.x+2+i*leter2, 0, pt.z), createVector(pt.x+2+i*leter2, 4, pt.z), createVector(pt.x+1+(i+1)*leter2, 4, pt.z), createVector(pt.x+1+(i+1)*leter2, 0, pt.z));
  }
}

// ------------------------------------------------------------

function albero(pt0) {
  let pt1 = pt0.copy();
  pt1.y += 4;
  let pt2 = pt1.copy();
  pt2.x += 2;
  pt2.z -= 2;
  let pp0 = proietta(pt0);
  let pp1 = proietta(pt1);
  let pp2 = proietta(pt2);
  lista.agg(0, ~~pp1.x, ~~pp1.y);
  lista.agg(6, ~~(pp2.x-pp1.x), 0);
  dlineav(pp0, pp1);
}

// ------------------------------------------------------------

function semaforox(pt0) {
  lineav(proietta(createVector(pt0.x -2, 0, pt0.z)), proietta(createVector(pt0.x -2, 5, pt0.z)));
  lineav(proietta(createVector(pt0.x-28, 0, pt0.z)), proietta(createVector(pt0.x-28, 5, pt0.z)));
  lineav(proietta(createVector(pt0.x -2, 4, pt0.z)), proietta(createVector(pt0.x-28, 4, pt0.z)));
  lineav(proietta(createVector(pt0.x -2, 5, pt0.z)), proietta(createVector(pt0.x-28, 5, pt0.z)));
  rettangolo_bianco(createVector(pt0.x -4, 4, pt0.z), createVector(pt0.x -4, 5, pt0.z), createVector(pt0.x -9, 5, pt0.z), createVector(pt0.x -9, 4, pt0.z));
  rettangolo_bianco(createVector(pt0.x-11, 4, pt0.z), createVector(pt0.x-11, 5, pt0.z), createVector(pt0.x-19, 5, pt0.z), createVector(pt0.x-19, 4, pt0.z));
  rettangolo_bianco(createVector(pt0.x-21, 4, pt0.z), createVector(pt0.x-21, 5, pt0.z), createVector(pt0.x-26, 5, pt0.z), createVector(pt0.x-26, 4, pt0.z));
}

// ------------------------------------------------------------

function semaforoz(pt0) {
  lineav(proietta(createVector(pt0.x, 0, pt0.z -2)), proietta(createVector(pt0.x, 5, pt0.z -2)));
  lineav(proietta(createVector(pt0.x, 0, pt0.z-18)), proietta(createVector(pt0.x, 5, pt0.z-18)));
  lineav(proietta(createVector(pt0.x, 4, pt0.z -2)), proietta(createVector(pt0.x, 4, pt0.z-18)));
  lineav(proietta(createVector(pt0.x, 5, pt0.z -2)), proietta(createVector(pt0.x, 5, pt0.z-18)));
  rettangolo_bianco(createVector(pt0.x, 4, pt0.z -4), createVector(pt0.x, 5, pt0.z -4), createVector(pt0.x, 5, pt0.z -9), createVector(pt0.x, 4, pt0.z -9));
  rettangolo_bianco(createVector(pt0.x, 4, pt0.z-11), createVector(pt0.x, 5, pt0.z-11), createVector(pt0.x, 5, pt0.z-16), createVector(pt0.x, 4, pt0.z-16));
}

// ------------------------------------------------------------

function box3d(pt1, pt2) {
  let p1 = proietta(createVector(pt1.x, pt1.y, pt2.z));
  let p2 = proietta(createVector(pt1.x, pt2.y, pt2.z));
  let p3 = proietta(createVector(pt1.x, pt1.y, pt1.z));
  let p4 = proietta(createVector(pt1.x, pt2.y, pt1.z));
  let p5 = proietta(createVector(pt2.x, pt1.y, pt1.z));
  let p6 = proietta(createVector(pt2.x, pt2.y, pt1.z));
  let p7 = proietta(createVector(pt2.x, pt1.y, pt2.z));

  lista.agg(3, ~~p1.x, ~~p1.y);
  lista.agg(3, ~~p2.x, ~~p2.y);
  lista.agg(3, ~~p4.x, ~~p4.y);
  lista.agg(3, ~~p6.x, ~~p6.y);
  lista.agg(3, ~~p5.x, ~~p5.y);
  lista.agg(4, ~~p7.x, ~~p7.y);

  if (p7.y > p1.y) {
    lista.agg(3, ~~p1.x, ~~p1.y);
    lista.agg(3, ~~p3.x, ~~p3.y);
    lista.agg(3, ~~p5.x, ~~p5.y);
    lista.agg(5, ~~p7.x, ~~p7.y);
  }
  
  dlinea(~~p1.x, ~~p1.y, ~~p3.x, ~~p3.y);
  dlinea(~~p1.x, ~~p1.y, ~~p2.x, ~~p2.y);
  dlinea(~~p2.x, ~~p2.y, ~~p4.x, ~~p4.y);
  dlinea(~~p3.x, ~~p3.y, ~~p4.x, ~~p4.y);
  dlinea(~~p3.x, ~~p3.y, ~~p5.x, ~~p5.y);
  dlinea(~~p5.x, ~~p5.y, ~~p6.x, ~~p6.y);
  dlinea(~~p4.x, ~~p4.y, ~~p6.x, ~~p6.y);
  if (p7.y > p1.y) {
    dlinea(~~p1.x, ~~p1.y, ~~p7.x, ~~p7.y);
    dlinea(~~p5.x, ~~p5.y, ~~p7.x, ~~p7.y);
  }
  
  striscia(pt2.y - pt1.y, p3, p4, p5, p6);
}

// ------------------------------------------------------------

function cilindro3d(pt, h, nrseg, rad, contorno) {
  let pv = new Array(nrseg).fill(0).map(d => []);
  for (let i=0; i<nrseg; i++) {
    let alfa = map(i, 0, nrseg, 0, TWO_PI);
    pv[i][0] = proietta(createVector(pt.x+15+rad*cos(alfa), pt.y, pt.z+15-rad*sin(alfa)));
    pv[i][1] = proietta(createVector(pt.x+15+rad*cos(alfa), pt.y+h, pt.z+15-rad*sin(alfa)));
  }
  for (let i=0; i<nrseg; i++) {
    let j = (i + nrseg - 1) % nrseg;
    if (pv[i][0].x <= pv[j][0].x) {
      if (i > 0) {
        lista.agg(3, ~~pv[j][0].x, ~~pv[j][0].y);
        lista.agg(3, ~~pv[i][0].x, ~~pv[i][0].y);
        lista.agg(3, ~~pv[i][1].x, ~~pv[i][1].y);
        lista.agg(4, ~~pv[j][1].x, ~~pv[j][1].y);
      }
    }
  }
  for (let i=0; i<nrseg; i++) {
    lista.agg(3, ~~pv[i][0].x, ~~pv[i][0].y);
  }
  lista.agg(5, ~~pv[0][0].x, ~~pv[0][0].y);
  for (let i=0; i<nrseg; i++) {
    let j = (i + nrseg - 1) % nrseg;
    let alfa = map(i, 0, nrseg, 0, TWO_PI) + 1;
    if (pv[i][0].x <= pv[j][0].x) {
      if (pv[(i+1)%nrseg][0].x >= pv[i][0].x) {
        lineav(pv[i][0], pv[i][1]);
      }
      if (contorno) lineav(pv[i][0], pv[i][1]);
      if (i > 0) {
        dlineav(pv[j][0], pv[i][0]);
        dlineav(pv[j][1], pv[i][1]);
        if (sin(alfa) > 0) striscia(h, pv[i][0], pv[i][1], pv[j][0], pv[j][1]);
      }
    }
    else {
      if (pv[(i+1)%nrseg][0].x <= pv[i][0].x) {
        lineav(pv[i][0], pv[i][1]);
      }
    }
  }
}

// ------------------------------------------------------------

function pilotis(pt0, dex, dez, h) {
  let nrx = ~~((dex - 1) / 6);
  let nrz = ~~((dez - 1) / 6);
  let delx = (dex-1) / nrx;
  let delz = (dez-1) / nrz;
  for (let i=nrz; i>0; i--) {
    box3d(createVector(pt0.x, 0, pt0.z+i*delz), createVector(pt0.x+1, h, pt0.z+i*delz+1));
  }
  for (let i=nrx; i>=0; i--) {
    box3d(createVector(pt0.x+i*delx, 0, pt0.z), createVector(pt0.x+i*delx+1, h, pt0.z+1));
  }
}

// ------------------------------------------------------------
// striscia tratteggiata in orizzontale

function striscia(del, p1, p2, p3, p4) {
  let r1 = (p1.y - p2.y) / del;
  let r2 = (p3.y - p4.y) / del;
  let pp = 0;
  while (pp < del) {
    linea(~~(p1.x), ~~(p2.y + pp * r1), ~~(p3.x), ~~(p4.y + pp * r2));
    pp += 0.5;
  }
}

// ------------------------------------------------------------

function rettangolo_bianco(pt1, pt2, pt3, pt4) {
  let p1 = proietta(pt1);
  let p2 = proietta(pt2);
  let p3 = proietta(pt3);
  let p4 = proietta(pt4);
  lista.agg(3, ~~p1.x, ~~p1.y);
  lista.agg(3, ~~p2.x, ~~p2.y);
  lista.agg(3, ~~p3.x, ~~p3.y);
  lista.agg(4, ~~p4.x, ~~p4.y);
  lineav(p1, p2);
  lineav(p2, p3);
  lineav(p3, p4);
  lineav(p4, p1);
}

function rettangolo_rigato(pt1, pt2, pt3, pt4) {
  rettangolo_bianco(pt1, pt2, pt3, pt4);
  striscia(pt2.y - pt1.y, proietta(pt1), proietta(pt2), proietta(pt4), proietta(pt3));
}

function rettangolo_nero(pt1, pt2, pt3, pt4) {
  let p1 = proietta(pt1);
  let p2 = proietta(pt2);
  let p3 = proietta(pt3);
  let p4 = proietta(pt4);
  lista.agg(3, ~~p1.x, ~~p1.y);
  lista.agg(3, ~~p2.x, ~~p2.y);
  lista.agg(3, ~~p3.x, ~~p3.y);
  lista.agg(5, ~~p4.x, ~~p4.y);
}

// ------------------------------------------------------------

// rettangolo pieno
function rettf(sx, sy, ex, ey) {
  
  let dex = ex - sx;
  let dey = ey - sy;
  lista.agg(0, sx, sy);
  for (let i=0; i<min(dex, dey); i+=6) {
    lista.agg(1, sx, sy + i);
    lista.agg(1, sx + i, sy);
  }
  if (dex > dey) {
    for (let i=0; i<dex-dey; i+=6) {
      lista.agg(1, sx + i, ey);
      lista.agg(1, sx + dey + i, sy);
    }
  }
  else {
    for (let i=0; i<dey-dex; i+=6) {
      lista.agg(1, sx, sy + dex + i);
      lista.agg(1, ex, sy + i);
    }
  }
  for (let i=min(dex, dey); i>=0; i-=6) {
    lista.agg(1, ex - i, ey);
    lista.agg(1, ex, ey - i);
  }
}

// ------------------------------------------------------------

function linea(sx, sy, ex, ey) {
  lista.agg(0, sx, sy);
  lista.agg(1, ex, ey);
}

function lineav(p1, p2) {
  linea(~~p1.x, ~~p1.y, ~~p2.x, ~~p2.y);
}

// ------------------------------------------------------------

function dlinea(sx, sy, ex, ey) {
  linea(sx, sy, ex, ey);
  linea(sx, sy, ex, ey);
}

function dlineav(p1, p2) {
  dlinea(~~p1.x, ~~p1.y, ~~p2.x, ~~p2.y);
}

// ------------------------------------------------------------

class cLista {

  constructor() {
    this.mat = new Array(100000).fill(0).map(d => []);
    this.nr = 0;
    this.pv = new Array(100).fill(0).map(d => createVector());
    this.nrv = 0;
    for (let i=0; i<this.pv.length; i++) {
      this.pv[i] = createVector(0, 0);
    }
  }
  
  agg(tipo, px, py) {
    this.mat[this.nr][0] = tipo;
    this.mat[this.nr][1] = px + ~~(random(-de, de));
    this.mat[this.nr][2] = py + ~~(random(-de, de));
    this.nr++;
  }
  
  _draw(el) {
    switch(this.mat[el][0]) {
      case 0: // move to
        penx = this.mat[el][1];
        peny = this.mat[el][2];
        break;
      case 1: // line to
        stroke(0, 0, 0, 0.5);
        noFill();
        line(penx, peny, this.mat[el][1], this.mat[el][2]);
        penx = this.mat[el][1];
        peny = this.mat[el][2];
        break;
      case 2: // rettangolo pieno
        noStroke();
        fill(0, 0, 1);
        rect(penx, peny, this.mat[el][1] - penx, this.mat[el][2] - peny);
        break;
      case 3: // vertice poligono pieno
        this.pv[this.nrv].x = this.mat[el][1];
        this.pv[this.nrv].y = this.mat[el][2];
        this.nrv++;
        break;
      case 4: // chiusura poligono pieno bianco
        this.pv[this.nrv].x = this.mat[el][1];
        this.pv[this.nrv].y = this.mat[el][2];
        this.nrv++;
        noStroke();
        fill(0, 0, 1);
        beginShape();
        for (let i=0; i<this.nrv; i++) {
          vertex(this.pv[i].x, this.pv[i].y);
        }
        endShape(CLOSE);
        this.nrv = 0;
        break;
      case 5: // chiusura poligono pieno nero
        this.pv[this.nrv].x = this.mat[el][1];
        this.pv[this.nrv].y = this.mat[el][2];
        this.nrv++;
        noStroke();
        fill(0, 0, 0);
        beginShape();
        for (let i=0; i<this.nrv; i++) {
          vertex(this.pv[i].x, this.pv[i].y);
        }
        endShape(CLOSE);
        this.nrv = 0;
        break;
      case 6: // sfera
        let px0;
        let py0;      
        let px1 = 0;
        let py1 = 0;
        let nrs = height / 6;
        let ra = random(2.1, 2.4);
        noStroke();
        fill(0, 0, 1);
        ellipse(penx, peny, 2*this.mat[el][1], 2*this.mat[el][1]);   
        stroke(0, 0, 0, 0.5);
        noFill();
        for (let i=0; i<nrs; i++) {
          let alfa = map(i, 0, nrs, 0, 2 * TWO_PI);
          px0 = px1;
          py0 = py1;
          let rad = this.mat[el][1] + 2 * de * sin(ra*alfa);
          px1 = penx + ~~(rad * cos(alfa));
          py1 = peny + ~~(rad * sin(alfa));
          if (i > 0) {
            line(px0, py0, px1, py1);
          }
        }
        break;
    }
  }
}

// ------------------------------------------------------------

