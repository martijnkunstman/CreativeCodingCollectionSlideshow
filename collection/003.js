//source https://openprocessing.org/sketch/819688

setup = _ => {
    createCanvas(W = 720, W);
    fill(W, 50);
    Counter = 0;
}



draw = _ => {
    Counter++;
    rect(0, 0, W, W);
    Angle = (PI + sin(Counter * 0.02)) / 7;
    for (j = 0; j < TWO_PI; j += TWO_PI / 8) {
        Tree(7, W / 2, W / 2, j, 45);
    }
    copy(10, 10, W - 20, W - 20, 0, 0, W, W);
}

Tree = (step, x, y, rad, lengs) => {
    if (step > 0) {
        inf = 20 - step; // influence of noise
        n = noise((x + Counter) / W, (y - Counter) / W) * inf
        line(x, y, x += cos(rad) * lengs + cos(n) * inf, y += sin(rad) * lengs + sin(n) * inf)
        step--
        lengs *= .9
        Tree(step, x, y, rad + Angle, lengs)
        Tree(step, x, y, rad - Angle, lengs)
    }
}