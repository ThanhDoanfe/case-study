let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
const GAME_BOARD_WIDTH = 480, GAME_BOARD_HEIGHT = 360;
const BALL_RADIUS = 7, BALL_RADIAN = 30, BALL_SPEED = 10;
const SCORE_INCREASING_SPEED = 1000;

let x = canvas.width/2;
let y = canvas.height-BALL_RADIAN;
let dx = 1;
let dy = -1;

const PADDLE_HEIGHT = 10;
const PADDLE_WIDTH = 85;
let paddleX = (canvas.width-PADDLE_WIDTH)/2;
let rightPressed = false;
let leftPressed = false;
let score=0;


let GameBoard = function (width,height) {
    this.width = width;
    this.height = height;
    this.drawGameBoard = function (canvas) {
        canvas.setAttribute('width', this.width);
        canvas.setAttribute('height', this.height);
    }
}
let gameBoard = new GameBoard(GAME_BOARD_WIDTH, GAME_BOARD_HEIGHT);
gameBoard.drawGameBoard(canvas);
let Ball = function (){
    this.xCoordinate = x;
    this.yCoordinate = y;
    this.ballRadian = BALL_RADIAN;
    this.ballSpeed = BALL_SPEED;
    this.move = function (){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        this.drawBall();
        x +=dx ;
        y += dy;


    }
    this.gameOver = function (){
        if (y + dy >canvas.height - PADDLE_HEIGHT-10){
            if(x > paddleX && x < paddleX + PADDLE_WIDTH) {
                dy = -dy-0.2;
            }
            else if(y+dy>canvas.height-PADDLE_HEIGHT+1){
                alert('GAME OVER');
                document.location.reload();
                clearInterval(this.changeScore);
            }
        }


    }
    this.changeDirection = function (){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.drawBall();

        if(x + dx > canvas.width-BALL_RADIUS || x + dx < BALL_RADIUS) {
            dx = -dx;
        }
        if(y + dy > canvas.height-BALL_RADIUS || y + dy < BALL_RADIUS) {
            dy = -dy;
        }


        x += dx;
        y += dy;
    }
    this.drawBall = function (alpha){
        if(!alpha)
            alpha=255;
        ctx.beginPath();
        ctx.arc(x, y, BALL_RADIUS,
            0,Math.PI*2,true);
        ctx.fillStyle =  "var(--foreground-color)";
        ctx.fill();
        ctx.closePath();
    }

}
let Paddle = function (width, xCoordinate){
    this.width = width;
    this.height = PADDLE_HEIGHT;
    this.xCoordinate = canvas.width-PADDLE_WIDTH;
    this.yCoordinate = canvas.height - PADDLE_HEIGHT;
    this.move = function (){
        document.addEventListener("keydown", keyDownHandler, false);
        document.addEventListener("keyup", keyUpHandler, false);
        function keyDownHandler(e) {
            if (e.key === "Right" || e.key === "ArrowRight") {
                rightPressed = true;
            } else if (e.key === "Left" || e.key === "ArrowLeft") {
                leftPressed = true;
            }
        }

        function keyUpHandler(e) {
            if (e.key === "Right" || e.key === "ArrowRight") {
                rightPressed = false;
            } else if (e.key === "Left" || e.key === "ArrowLeft") {
                leftPressed = false;
            }
        }

        if(rightPressed) {
            paddleX += 7;
            if (paddleX + PADDLE_WIDTH > canvas.width){
                paddleX = canvas.width - PADDLE_WIDTH;
            }
        }
        else if(leftPressed) {
            paddleX -= 7;
            if (paddleX < 0){
                paddleX = 0;
            }
        }
    }
    this.drawPaddle = function (){
        ctx.beginPath();
        ctx.rect(paddleX,this.yCoordinate-10,
            this.width,this.height);
        ctx.fillStyle = " var(--foreground-color)";
        ctx.fill();
        ctx.closePath();
    }
}
let drawScore=function (){

    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+ parseInt( score*0.01), 8, 20);
    this.changeScore=function (){
         score++;
        if(score==10000){
            alert("may thang roi nhe")
            clearInterval(this.changeScore);

        }

    }



 }
function drawGame(){
    let ball = new Ball(x,y, BALL_RADIAN, BALL_SPEED);
    let paddle = new Paddle(PADDLE_WIDTH,200);
    let score=new drawScore();
    score.changeScore();
    ctx.clearRect( 0, 0, canvas.width, canvas.height);
    ball.drawBall();
    ball.move();
    ball.changeDirection();
    ball.gameOver();
    paddle.drawPaddle(paddleX,PADDLE_WIDTH);
    paddle.move();
     drawScore();
    // drawPlayerName();
}

const interval = setInterval(drawGame, BALL_SPEED);