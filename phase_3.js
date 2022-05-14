'use strict';
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
// let focus_x = canvas.width/2;
// let focus_y = canvas.height - 30;
// let focus = [0, 0];

let cell_size = Math.floor(canvas.height/15);
const grid_width =  Math.floor(canvas.width/cell_size); //小数点切り捨て
const base_point = [Math.floor(grid_width/2*cell_size), cell_size*6]

let face1 = [[1, 1, 1],[1, 1, 1],[1, 1, 1]]
let face2 = [[2, 2, 2],[2, 2, 2],[2, 2, 2]]
let face3 = [[3, 3, 3],[3, 3, 3],[3, 3, 3]]
let face4 = [[4, 4, 4],[4, 4, 4],[4, 4, 4]]
let face5 = [[5, 5, 5],[5, 5, 5],[5, 5, 5]]
let face6 = [[6, 6, 6],[6, 6, 6],[6, 6, 6]]
let face = [face1, face2, face3, face4, face5, face6]
// console.log(face)

let right_pressed = false;
let left_pressed = false;
let down_pressed = false;
let up_pressed = false;

ctx.strokeStyle = 'gray';
ctx.lineWidth = 1;

function draw_cell(base_x, base_y){
    ctx.fillRect(base_x, base_y, cell_size, cell_size);
}

function draw_cube(num){
    let base = new Array(2);
    ctx.beginPath();
    if(num == 1){
        ctx.fillStyle = 'green'
        base[0] = base_point[0]-cell_size*3;
        base[1] = base_point[1];
    }else if(num == 2){
        ctx.fillStyle = 'white'
        base[0] = base_point[0]-cell_size*3;
        base[1] = base_point[1]-cell_size*3;
    }else if(num == 3){
        ctx.fillStyle = 'yellow'
        base[0] = base_point[0]-cell_size*3;
        base[1] = base_point[1]+cell_size*3;
    }else if(num == 4){
        ctx.fillStyle = 'orange'
        base[0] = base_point[0]-cell_size*6;
        base[1] = base_point[1]
    }else if(num == 5){
        ctx.fillStyle = 'red'
        base[0] = base_point[0]
        base[1] = base_point[1]
    }else if(num == 6){
        ctx.fillStyle = 'blue'
        base[0] = base_point[0]+cell_size*3
        base[1] = base_point[1]
    }
    ctx.arc(base[0], base[1], 3, 0, Math.PI*2, false);
    draw_cell(base[0], base[1]);
    ctx.fill();

    ctx.closePath();
}

//-----------------------------------
function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw_grid();
    draw_base_point();
    let face_buf = return_face(1);
    // console.log(face_buf);
    for(let i=1; i <= 6; i++){
        draw_cube(i);
    }
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

function return_face(num){
    return face[num];
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