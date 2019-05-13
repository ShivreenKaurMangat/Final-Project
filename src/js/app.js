const levels = document.querySelector(".levels")
const image1 = document.querySelector(".image1");
const image2 = document.querySelector(".image2");
const image3 = document.querySelector(".image3");
let numberOfLives = 3;
let countOfLevel = 1;

// Enemies our player must avoid
let Enemy = function (x, y, speed) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's playerPosition, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x += this.speed * countOfLevel * dt;
  if (this.x > 650) {
    this.x = -70;
  }

  //Collision 
  if (player.x < this.x + 75 && player.x + 75 > this.x && player.y < this.y + 70 && player.y + 70 > this.y) {
    player.x = 205;
    player.y = 405;
    numberOfLives--;
    if (numberOfLives === 2) {
      image1.remove();
      swal({
        title: "OH NO!!!",
        text: "You have 2 lives!!!",
        icon: "error",
      });
    } else if (numberOfLives === 1) {
      image1.remove();
      image2.remove();
      swal({
        title: "OH NO!!!",
        text: "You have 1 live!!!",
        icon: "error",
      });
    } else if (numberOfLives === 0) {
      image1.remove();
      image2.remove();
      image3.remove();
      swal({
        title: "OH NO!!!",
        text: "You have NO live!!!",
        icon: "error",
      });
    }
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-cat-girl.png';
  }

  update() {
    if (this.y < 15) {
      this.y = this.y + 430;
      countOfLevel++;
      levels.innerHTML = `${countOfLevel}`
      swal({
        title: "Conngratulations!!!",
        text: "You reached next level!!!",
        icon: "success",
      });
    }
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  handleInput(playerPosition) {
    if (this.x > 0 && playerPosition === "left") {
      this.x -= 100;
    }
    if (this.y > 0 && playerPosition === "up") {
      this.y -= 85;
    }
    if (this.x < 400 && playerPosition === "right") {
      this.x += 100;
    }
    if (this.y < 385 && playerPosition === "down") {
      this.y += 85;
    }
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
let enemy1 = new Enemy(-70, 60, 100);
let enemy2 = new Enemy(-70, 140, 200);
let enemy3 = new Enemy(-70, 220, 300);
allEnemies.push(enemy1, enemy2, enemy3);
let player = new Player(200, 415);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});