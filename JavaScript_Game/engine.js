
// 2D rendering context
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
// starting position of the ball
var x = canvas.width/2;
var y = canvas.height-30;
 // ball movement&size
var dx = 2;
var dy = -2;
var ballRadius = 10;
// padlle info
var paddleHeight = 10;
var paddleWidth= 75;
var paddleX = (canvas.width -paddleWidth) / 2;
// variables for
var rightPressed = false;
var leftPressed = false;
// variables for upper bricks
var brickRowCount = 3;
var brickColumnCount = 9;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 20;
// array for bricks
var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status : 1};
    }
}
// variable for score
var score = 0;
var add_scoreboard1 = document.getElementById("name_score");
var add_scoreboard2 = document.getElementById("name_score2");
// variable lives
var lives = 1;

// function to draw score
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 8, 20);
}

// function to draw lives
function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

// function to draw bricks
function drawBricks() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

// function to draw ball,
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// function to draw paddle
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// function to draw
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawBricks();
    collisionDetection();
    drawScore();
    drawLives();
    x += dx;
    y += dy;

    // collision detection left&right
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius ) {
        dx = -dx;
    }
    // collision detection top&bottom&paddle
    if(y + dy < ballRadius) {
        dy = -dy;
    } else if(y +dy > canvas.height-ballRadius){
        if( x > paddleX && x < paddleX + paddleWidth){
            dy = -dy;

        }
        else {
            lives--;
            if(lives <= 0) {
              var score_result1 = prompt("Your score is: " + score +  " Please enter your name", "<name goes here>");
              add_scoreboard1.textContent = ("Name, score: " + score_result +" scored " + score);
              reset();
            }
              else if(!add_scoreboard1){
                var score_result2 = prompt("Your score is: " + score +  " Please enter your name", "<name goes here>");
                add_scoreboard2.textContent = ("Name, score: " + score_result +" scored " + score);
                reset();
                }
            else {
              x = canvas.width/2;
              y = canvas.height-30;
              dx = 3;
              dy = -3;
              paddleX = (canvas.width-paddleWidth)/2;

          }
        }
    }
    // paddle movement
    if(rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
    requestAnimationFrame(draw);
}
function reset(){
  lives = 1;
  score = 0;
  x = canvas.width/2;
  y = canvas.height-30;
  dx = 3;
  dy = -3;
  paddleX = (canvas.width-paddleWidth)/2;
  console.log(lives);
}
// key handlers events
function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight" || e.key == "d") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft" || e.key == "a") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight" || e.key == "d") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft" || e.key == "a") {
        leftPressed = false;
    }
}

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}

// collision detection ball&bricks
function collisionDetection() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && (y-5) > b.y && (y-5) < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if(score == brickRowCount * brickColumnCount) {
                        alert("YOU WIN, CONGRATZ!");
                        Document.location.reload();
                        clearInterval(interval);
                    }
                }
            }
        }
    }
}

document.addEventListener("mousemove", mouseMoveHandler, false);
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// start
draw();
