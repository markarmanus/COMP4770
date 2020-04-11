export default class Vec2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.length = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    this.normalX = this.length === 0 ? 0 : x / this.length;
    this.normalY = this.length === 0 ? 0 : y / this.length;
  }

  subtract(vector) {
    return new Vec2(this.x - vector.x, this.y - vector.y);
  }
  cross(vector) {
    return this.x * vector.y - this.y * vector.x;
  }
}
