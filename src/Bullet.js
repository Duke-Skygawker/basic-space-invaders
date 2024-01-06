import GameObject from "./GameObject";

export default class Bullet extends GameObject {
  constructor(x, y, width, height, color, dy) {
    super(x, y, width, height, color);
    // Set the bullet's y direction.
    this.dy = dy;
  }

  update(dx, dy) {
    this.y += this.dy;
  }
}
