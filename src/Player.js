import SpaceShip from "./SpaceShip";

export class Player extends SpaceShip {
  constructor(x, y, width, height, color, canvasHeight, canvasWidth) {
    super(x, y, width, height, color, canvasHeight);
    this.canvasWidth = canvasWidth;
  }

  // Update the player's position
  update(dx, dy) {
    super.update(dx, dy);

    // Keep the player within the canvas
    if (this.x < 0) {
      this.x = 0;
    } else if (this.x + this.width > this.canvasWidth) {
      this.x = this.canvasWidth - this.width;
    }
  }
}

export default Player;
