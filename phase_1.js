'use strict';
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
// let focus_x = canvas.width/2;
// let focus_y = canvas.height - 30;
// let focus = [0, 0];

let cell_size = Math.floor(canvas.height/15);
const grid_width =  Math.floor(canvas.width/cell_size); //小数点切り捨て
const base_point = [Math.floor(grid_width/2*cell_size), cell_size*6]

let right_pressed = false;
let left_pressed = false;
let down_pressed = false;
let up_pressed = false;

ctx.strokeStyle = 'gray';
ctx.lineWidth = 1;

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw_grid();
    draw_base_point();
    requestAnimationFrame(draw);
}
draw();

function draw_grid(){
    ctx.beginPath();
    // horizontal line
    for(let i=0.0; i < canvas.height; i+=cell_size){
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
    }
    for(let i=0.0; i < canvas.width; i+=cell_size){
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
    }
    ctx.closePath();
    ctx.stroke();
}

function draw_base_point(){
    ctx.beginPath();
    ctx.fillStyle = 'black'
    ctx.arc(base_point[0], base_point[1], 3, 0, Math.PI*2, false);
    ctx.fill();
    ctx.closePath();
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        right_pressed = true;
    }else if(e.key == "Left" || e.key == "ArrowLeft") {
        left_pressed = true;
    }else if(e.keycode == 38){
        up_pressed = true;
    }else if(e.keycode == 40){
        down_pressed = true;
    }
}
function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        right_pressed = false;
    }else if(e.key == "Left" || e.key == "ArrowLeft") {
        left_pressed = false;
    }else if(e.keycode == 38){
        up_pressed = false;
    }else if(e.keycode == 40){
        down_pressed = false;
    }
}