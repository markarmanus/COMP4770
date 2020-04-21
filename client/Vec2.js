export default class Vec2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.length = this.getLength();
    this.normalX = this.length === 0 ? 0 : x / this.length;
    this.normalY = this.length === 0 ? 0 : y / this.length;
  }

  subtract(vector) {
    return new Vec2(this.x - vector.x, this.y - vector.y);
  }
  cross(vector) {
    return this.x * vector.y - this.y * vector.x;
  }
  normalize() {
    const length = this.getLength();
    return new Vec2(
      length === 0 ? 0 : this.x / length,
      length === 0 ? 0 : this.y / length
    );
  }

  getLength() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }
  multiply(value) {
    return new Vec2(this.x * value, this.y * value);
  }
  trancate(value) {
    const x =
      this.x > value ? value : this.x < value * -1 ? value * -1 : this.x;
    const y =
      this.y > value ? value : this.y < value * -1 ? value * -1 : this.y;
    return new Vec2(x, y);
  }
  angle(vector) {
    const dx = vector.x - this.x;
    const dy = vector.y - this.y;
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    return angle > 0 ? angle : 360 + angle;
  }
}
