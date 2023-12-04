class Line {
  constructor(point1, point2) {
    this.point1 = point1
    this.point2 = point2
  }

  getVector1() {
    return this.point1
  }

  getVector2() {
    return this.point2
  }

  // https://stackoverflow.com/questions/9043805/test-if-two-lines-intersect-javascript-function
  // thank you stack overflow
  intersectsWith(line) {

    let a = this.point1.getX()
    let b = this.point1.getY()
    let c = this.point2.getX()
    let d = this.point2.getY()

    let p = line.getVector1().getX()
    let q = line.getVector1().getY()
    let r = line.getVector2().getX()
    let s = line.getVector2().getY()

    var det, gamma, lambda;
    det = (c - a) * (s - q) - (r - p) * (d - b);
    if (det === 0) {
      return false;
    } else {
      lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
      gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
      return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
    }
  };
}