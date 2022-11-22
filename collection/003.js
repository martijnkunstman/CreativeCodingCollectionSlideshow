//source: https://openprocessing.org/sketch/819688

setup = _ => {
    createCanvas(windowWidth, windowHeight);
    fill("rgba(255,255,255,0.05)");
    Counter = 0;
}

draw = _ => {
    Counter++;
    rect(0, 0, windowWidth, windowHeight);
    Angle = (PI + sin(Counter * 0.02)) / 8;
    for (j = 0; j < TWO_PI; j += TWO_PI / 5) {
        Tree(6, windowWidth / 2, windowHeight / 2, j, 50);
    }
    copy(20, 5, windowWidth-40, windowHeight-10, 0, 0, windowWidth, windowHeight);
}

Tree = (step, x, y, rad, lengs) => {
    if (step > 0) {
        inf = 20 - step; // influence of noise
        n = noise((x + Counter) / windowWidth, (y - Counter) / windowHeight) * inf
        line(x, y, x += cos(rad) * lengs + cos(n) * inf, y += sin(rad) * lengs + sin(n) * inf)
        step--
        lengs *= .9
        Tree(step, x, y, rad + Angle, lengs)
        Tree(step, x, y, rad - Angle, lengs)
    }
}