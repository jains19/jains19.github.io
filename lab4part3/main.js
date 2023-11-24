//Name: Sumit Jain
//File: main.js
//Date: 17 November 2023

// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

// function to generate random color

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}


class Ball {

  constructor(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
  }

  // Draws the ball on the canvas.
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  update() {
    // Checks if the ball is going outside viewport from the right side.
    if ((this.x + this.size) >= width) {
      this.velX = -(Math.abs(this.velX));
    }
    // Checks if the ball is going outside viewport from the left side.
    if ((this.x - this.size) <= 0) {
      this.velX = Math.abs(this.velX);
    }
    // Checks if the ball is going outside viewport from the bottom side.
    if ((this.y + this.size) >= height) {
      this.velY = -(Math.abs(this.velY));
    }
    // Checks if the ball is going outside viewport from the top side.
    if ((this.y - this.size) <= 0) {
      this.velY = Math.abs(this.velY);
    }

    // Add the speed and direction accordingly to the above conditions.
    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect() {
    for (const ball of balls) {
      if (!(this === ball)) {
        const changeInX = this.x - ball.x;
        const changeInY = this.y - ball.y;

        // Implementing the circle to circle collision algo
        const distance = Math.sqrt(changeInX * changeInX + changeInY * changeInY);
        if (distance < (this.size + ball.size)) {
          // Change the color of the balls when collided.
          ball.color = this.color = randomRGB();
        }
      }
    }
  }
}
const balls = [];
function generateBalls() {
  // Generated the 25 balls with different color, x, y, speedX and speedY.
  while (balls.length < 25) {
    const size = random(10,20);
    const ball = new Ball(
      random(0 + size,width - size),
      random(0 + size,height - size),
      random(-7,7),
      random(-7,7),
      randomRGB(),
      size
    );

  balls.push(ball);
  }
}

generateBalls();

function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0,  width, height);

  for (let i = 0; i < balls.length; i++) {
    const ball = balls[i];
    ball.draw();
    ball.update();
    ball.collisionDetect();
  }

  // Re-running the loop again and again with updated properties of the balls
  // prior to the next repaint.
  requestAnimationFrame(loop);
}

// Invoke the animation loop.
loop();
