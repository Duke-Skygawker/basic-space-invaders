import GameObject from "./GameObject";

class Asteroid {
  constructor(x, y, width, height, color, noParts) {
    // Set an empty array for asteroid parts.
    this.parts = [];
    // Create the asteroid's parts.
    for (var i = 0; i < noParts; i++) {
      for (var j = 0; j < noParts; j++) {
        this.parts.push(
          new GameObject(x + i * width, y + j * height, width, height, color)
        );
      }
    }
  }

  // Draw the asteroid on the canvas.
  draw(ctx) {
    for (var i = 0; i < this.parts.length; i++) {
      this.parts[i].draw(ctx);
    }
  }

  // Check if the asteroid is colliding with another object.
  collidesWith(obj) {
    for (var i = 0; i < this.parts.length; i++) {
      if (this.parts[i].collidesWith(obj)) {
        return true;
      }
    }
    return false;
  }

  // Remove sub object on collide.
  removeOnCollide(obj) {
    for (var i = 0; i < this.parts.length; i++) {
      if (this.parts[i].collidesWith(obj)) {
        this.parts.splice(i, 1);
        break;
      }
    }
  }
}
export default Asteroid;
