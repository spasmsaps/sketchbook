// p5js 0.3.16
var d = 24;
var n = 128;
var a = new Array(n);

function setup() {
  var canvas = createCanvas(700, 700);
  canvas.parent('sketchContainer');
  frameRate(30);
  noFill();
  generate();
}

function draw() {
  background(255);
  resolveCircleIntersection();
  stroke(127);
  strokeWeight(1);
  drawNodes();
  stroke(25);
  strokeWeight(3);
  relativeNeighbors();
}

function mousePressed() {
  generate();
}

function generate() {
  for (var i = 0; i < n; i++) {
    a[i] = createVector(random(d * 5, width - d * 5), random(d * 5, height - d * 5), d);
  }
}

function drawNodes() {
  for (var i = 0; i < n; i++) {
    ellipse(a[i].x, a[i].y, d, d);
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
        line(a[j].x, a[j].y, a[i].x, a[i].y);
      }
    }
  }
}
