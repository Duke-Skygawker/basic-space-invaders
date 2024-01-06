// Defines a general class used to specify game objects.
export default class GameObject {
  constructor(x, y, width, height, color) {
    // Define the object's position
    this.x = x;
    this.y = y;

    // Define the object's size
    this.width = width;
    this.height = height;

    // Define the object's color
    this.color = color;
  }

  // Draw the object on the canvas
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  // Update the object's position
  update(dx, dy) {
    this.x += dx;
    this.y += dy;
  }

  // Check if the object is colliding with another object
  collidesWith(obj) {
    return (
      this.x < obj.x + obj.width &&
      this.x + this.width > obj.x &&
      this.y < obj.y + obj.height &&
      this.y + this.height > obj.y
    );
  }
}
