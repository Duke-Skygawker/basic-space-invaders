import GameObject from "./GameObject";
import Bullet from "./Bullet";

class SpaceShip extends GameObject {
  constructor(x, y, width, height, color, canvasHeight) {
    super(x, y, width, height, color);
    // Set canvas height.
    this.canvasHeight = canvasHeight;
    // Set the spaceship's bullet size.
    this.bulletWidth = 4;
    this.bulletHeight = 8;
    // Set the spaceship's bullet color.
    this.bulletColor = "#ff7800";
    // Bullets fired by the spaceship
    this.bullets = [];
  }

  // Override the draw method to also draw the spaceship's bullets.
  draw(ctx) {
    super.draw(ctx);
    // Draw the spaceship's bullets.
    for (var i = 0; i < this.bullets.length; i++) {
      this.bullets[i].draw(ctx);
      this.bullets[i].update(0, 0);

      // Check if the bullet is out of bounds.
      if (this.bullets[i].y < 0 || this.bullets[i].y > this.canvasHeight) {
        // Remove the bullet from the array.
        this.bullets.splice(i, 1);
      }
    }
  }

  // A method used to fire bullets from a spaceship
  shoot(dy) {
    this.bullets.push(
      new Bullet(
        this.x + this.width / 2 - this.bulletWidth / 2,
        this.y - this.bulletHeight,
        this.bulletWidth,
        this.bulletHeight,
        this.bulletColor,
        dy
      )
    );
  }
}
export default SpaceShip;
