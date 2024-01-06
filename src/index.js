import _ from "lodash";

import SpaceShip from "./SpaceShip.js";
import Player from "./Player.js";
import Asteroid from "./Asteroid.js";

// Defines an empty object used to specify game properties and behavior.
var game = {};

const dpi = window.devicePixelRatio;
// Define canvas and context
game.canvas = document.getElementById("canvas");
game.ctx = game.canvas.getContext("2d");

// Define background color
game.backgroundColor = "#000";

// The number of parts an asteroid is made of
game.asteroidsParts = 8;
// Number of asteroids spawned in the canvas
game.noOfAsteroids = 8;
// The space between each asteroid
game.asteroidsSpace = 85;

// The number of enemies spawned on each line
game.enemiesEachLine = 20;
// The number of enemy lines
game.enemyLines = 8;
// The space between each enemy
game.enemySpace = 30;
// The time between each enemy shot
game.enemyFireRate = 1000;
// Enemy shooting timer
game.enemyFireTimer = 0;
// Enemies' direction on the x axis
game.enemyDirection = 1;
// The number of steps an enemy takes down
// on the y axis when one of the sides is reached.
game.enemyStep = 5;

// Defines a function to handle the game loop
game.update = function () {
  // Draw canvas background
  game.ctx.fillStyle = game.backgroundColor;
  game.ctx.fillRect(0, 0, game.canvas.width, game.canvas.height);

  // Draw player
  game.player.draw(game.ctx);

  // Draw asteroids
  for (var i = 0; i < game.asteroids.length; i++) {
    game.asteroids[i].draw(game.ctx);
  }

  // Draw enemies
  for (var i = 0; i < game.enemies.length; i++) {
    game.enemies[i].draw(game.ctx);
    game.enemies[i].update(game.enemyDirection, 0);
  }

  // Check if the player has destroyed all enemies
  if (game.enemies.length == 0) {
    // Reset the game
    game.restart();
  }

  // Check if the enemies are out of bounds.
  if (game.enemyDirection == 1) {
    // Find the enemy closest to the right side of the screen
    var closestToRightSideEnemy = game.enemies[0];
    for (var i = 1; i < game.enemies.length; i++) {
      if (game.enemies[i].x > closestToRightSideEnemy.x) {
        closestToRightSideEnemy = game.enemies[i];
      }
    }

    // Check if the enemy closest to the right side of
    // the screen has reached the right side of the screen.
    if (
      closestToRightSideEnemy.x + closestToRightSideEnemy.width >
      game.canvas.width
    ) {
      // Reverse the direction of the enemies.
      game.enemyDirection = -1;
      // Move the enemies down.
      for (var i = 0; i < game.enemies.length; i++) {
        game.enemies[i].update(0, game.enemyStep);
      }
    }
  } else if (game.enemyDirection == -1) {
    // Find the enemy closest to the left side of the screen
    var closestToLeftSideEnemy = game.enemies[0];
    for (var i = 1; i < game.enemies.length; i++) {
      if (game.enemies[i].x < closestToLeftSideEnemy.x) {
        closestToLeftSideEnemy = game.enemies[i];
      }
    }

    // Check if the enemy closest to the left side of
    // the screen has reached the left side of the screen.
    if (closestToLeftSideEnemy.x < 0) {
      // Reverse the direction of the enemies.
      game.enemyDirection = 1;
      // Move the enemies down.
      for (var i = 0; i < game.enemies.length; i++) {
        game.enemies[i].update(0, game.enemyStep);
      }
    }
  }

  // Enemy fire counter
  game.enemyFireTimer += Math.random() * 10;
  if (game.enemyFireTimer > game.enemyFireRate) {
    game.enemyFireTimer = 0;
    // Fire enemy bullet
    game.enemies[Math.floor(Math.random() * game.enemies.length)].shoot(5);
  }

  // Check if player bullet collides with asteroid
  for (var i = 0; i < game.player.bullets.length; i++) {
    for (var j = 0; j < game.asteroids.length; j++) {
      if (game.asteroids[j].collidesWith(game.player.bullets[i])) {
        game.asteroids[j].removeOnCollide(game.player.bullets[i]);
        game.player.bullets.splice(i, 1);
        break;
      }
    }
  }

  // Check if enemy bullet collides with asteroid
  for (var i = 0; i < game.enemies.length; i++) {
    for (var j = 0; j < game.enemies[i].bullets.length; j++) {
      for (var k = 0; k < game.asteroids.length; k++) {
        if (game.asteroids[k].collidesWith(game.enemies[i].bullets[j])) {
          game.asteroids[k].removeOnCollide(game.enemies[i].bullets[j]);
          game.enemies[i].bullets.splice(j, 1);
          break;
        }
      }
    }
  }

  // Check if player bullet collides with enemy
  for (var i = 0; i < game.player.bullets.length; i++) {
    for (var j = 0; j < game.enemies.length; j++) {
      if (game.enemies[j].collidesWith(game.player.bullets[i])) {
        game.enemies.splice(j, 1);
        game.player.bullets.splice(i, 1);
        break;
      }
    }
  }

  // Check if enemy bullet collides with player
  for (var i = 0; i < game.enemies.length; i++) {
    for (var j = 0; j < game.enemies[i].bullets.length; j++) {
      if (game.player.collidesWith(game.enemies[i].bullets[j])) {
        // Reset the game
        game.restart();
        break;
      }
    }
  }

  // Check if an enemy has reached the player's y position.
  for (var i = 0; i < game.enemies.length; i++) {
    if (game.enemies[i].y + game.enemies[i].height > game.player.y) {
      game.restart();
      break;
    }
  }
};

// Defines a function to handle key events
game.keydown = function (e) {
  // If the left arrow key is pressed, move the player left.
  if (e.key == "ArrowLeft" || e.key == "a") {
    game.player.update(-5.5, 0);
  }
  // If the right arrow key is pressed, move the player right.
  if (e.key == "ArrowRight" || e.key == "d") {
    game.player.update(5.5, 0);
  }
  // If the space bar is pressed, fire a bullet.
  if (e.key == " ") {
    game.player.shoot(-5.5);
  }
};

// Defines a function to start the game loop
game.init = function () {
  // Set the game loop
  game.interval = setInterval(game.update, 1000 / 60);

  game.player = new Player(
    game.canvas.width / 2 - 50,
    game.canvas.height - 50,
    20,
    20,
    "#0099CC",
    game.canvas.width
  );

  // Setup asteroids
  game.asteroids = [];
  for (var i = 0; i < game.noOfAsteroids; i++) {
    game.asteroids.push(
      new Asteroid(
        game.asteroidsSpace + i * game.asteroidsSpace,
        game.canvas.height - 180,
        5,
        5,
        "#ffffff",
        game.asteroidsParts
      )
    );
  }

  // Setup enemies
  game.enemies = [];
  for (var i = 0; i < game.enemyLines; i++) {
    for (var j = 0; j < game.enemiesEachLine; j++) {
      game.enemies.push(
        new SpaceShip(
          game.enemySpace + j * game.enemySpace,
          game.enemySpace + i * game.enemySpace,
          20,
          20,
          "#FF0000"
        )
      );
    }
  }
};

// Defines a function to stop the game loop
game.stop = function () {
  clearInterval(game.interval);
};

// Defines a function to restart the game
game.restart = function () {
  game.stop();
  game.init();
};

// Start the game on window load
window.onload = game.init;

// Detect key events
window.onkeydown = game.keydown;
