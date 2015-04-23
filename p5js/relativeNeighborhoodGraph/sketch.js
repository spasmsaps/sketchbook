/* p5js tag v0.4.4 */

var d = 24;
var n = 128;
var a = new Array(n);
var w2, h2;

function setup() {
  var canvas = createCanvas(700, 700);
  canvas.parent('sketchContainer');
  frameRate(30);
  fill('white');
  stroke('black');
  w2 = width * .5;
  h2 = height * .5;
  generate();
}

function draw() {
  resolveCircleIntersection();
  background('white');
  relativeNeighbors();
  drawNodes();
}

function mousePressed() {
  if(mouseButton === LEFT && mouseX >= 0 && mouseY >= 0 && mouseX <= width && mouseY <= height) {
    generate();
    return false; // prevent any default behavior from the browser
  }
}

function generate() {
  for (var i = 0; i < n; i++) {
    a[i] = createVector(w2 + random(-d, d), h2 + random(-d, d), random(d * 0.666, d));
  }
}

function drawNodes() {
  for (var i = 0; i < n; i++) {
    strokeWeight(a[i].z * .11618);
    ellipse(a[i].x, a[i].y, a[i].z, a[i].z);
  }
}

function resolveCircleIntersection() {
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      if (i != j) {
        var x = a[j].x - a[i].x;
        var y = a[j].y - a[i].y;
        var r = a[j].z + a[i].z;
        var s = sq(x) + sq(y);
        if (s < sq(r) - 0.001) {
          var v = createVector(x, y);
          v.normalize();
          v.mult((r - sqrt(s)) * 0.5);
          a[i].sub(v);
          a[j].add(v);
        }
      }
    }
  }
}

function relativeNeighbors() {
  var i, j, k;
  for (i = 0; i < n; i++) {
    for (j = i + 1; j < n; j++) {
      var dij = dist(a[j].x, a[j].y, a[i].x, a[i].y);
      for (k = 0; k < n; k++) {
        if ((k != i) && (k != j)) {
          if (dist(a[k].x, a[k].y, a[i].x, a[i].y) < dij && dist(a[k].x, a[k].y, a[j].x, a[j].y) < dij) {
            break;
          }
        }
      }
      if (k == n) {
        strokeWeight((a[j].z + a[i].z) * .1);
        line(a[j].x, a[j].y, a[i].x, a[i].y);
      }
    }
  }
}
