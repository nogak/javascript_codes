let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let x = canvas.width/2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
let ball_radius = 10;
let score = 0;
let lifes = 3;

let paddle_height = 10;
let paddle_width = 75;
let paddle_x = (canvas.width-paddle_width)/2.0;
let right_pressed = false;
let left_pressed = false;

let brick_row_count = 3;
let brick_column_count = 5;
let brick_width = 75;
let brick_height = 20;
let brick_padding = 10;
let brick_offset_top = 30;
let brick_offset_left = 30;

let bricks = [];
for(let i=0; i < brick_column_count; i++){
    bricks[i] = [];
    for(let j=0; j < brick_row_count; j++){
        bricks[i][j] = {x: 0, y: 0, status: 1};
    }
}


function draw_ball(){
    ctx.beginPath();
    // ctx.arc(x, y, 10, 0, Math.PI*2);
    if(y + dy - ball_radius < 0){ // ボールが画面上はみ出た場合
        dy = -dy;
    }else if(y + dy + ball_radius > canvas.height){ // 画面下はみ出た場合
        if(paddle_x < x && x < paddle_x + paddle_width){
            dy = -dy;
        }else if(lifes != 0){
            lifes -= 1;
            x = canvas.width/2;
            y = canvas.height - 30;
            dy = -dy;
        }else{
            alert("GAME OVER");
            document.location.reload();
            clearInterval(); //needed for chrome to end game
        }
    }

    if(x + dx - ball_radius < 0 || x + dx + ball_radius > canvas.width){
        dx = -dx;
    }
    ctx.arc(x, y, ball_radius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function draw_paddle(){
    ctx.beginPath();
    if(right_pressed && paddle_x + paddle_width < canvas.width){
        paddle_x += 5;
    }else if (left_pressed && paddle_x > 0){
        paddle_x -= 5;
    }
    ctx.rect(paddle_x, canvas.height-paddle_height, paddle_width, paddle_height)
    ctx.fillstyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function draw_lifes(){
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("lifes: "+lifes, canvas.width-65, 20);
}

function draw_bricks(){
    for(let i=0; i < brick_column_count; i++){
        for(let j=0; j < brick_row_count; j++){
            if(bricks[i][j].status == 1){
                bricks[i][j].x = (i*(brick_width+brick_padding))+brick_offset_left;
                bricks[i][j].y = (j*(brick_height+brick_padding))+brick_offset_top;
                ctx.beginPath();
                ctx.rect(bricks[i][j].x, bricks[i][j].y, brick_width, brick_height);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function collision_detection(){
    for(let i=0; i < brick_column_count; i++){
        for(let j=0; j < brick_row_count; j++){
            // let b = bricks[i][j];
            if(bricks[i][j].x < x && x < bricks[i][j].x+brick_width && bricks[i][j].y < y && y < bricks[i][j].y+brick_height && bricks[i][j].status == 1){
                dy = -dy;
                bricks[i][j].status = 0;
                score++;
                if(score == brick_row_count*brick_column_count){
                    alert("You win, congratulations!");
                    document.location.reload();
                }
            }
        }
    }
}

function draw_score(){
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("score: " + score, 8, 20);
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw_ball();
    draw_paddle();
    draw_bricks();
    collision_detection();
    draw_score();
    draw_lifes();
    x += dx;
    y += dy;
    requestAnimationFrame(draw);
}
// setInterval(draw, 10);
draw();

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);
function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        right_pressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        left_pressed = true;
    }
}
function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        right_pressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        left_pressed = false;
    }
}
function mouseMoveHandler(e){
    let relative_x = e.clientX - canvas.offsetLeft;
    if(0 < relative_x && relative_x < canvas.width){
        paddle_x = relative_x - paddle_width/2;
    }
}