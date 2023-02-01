const canvas = document.querySelector('canvas');
const context = canvas.getContext("2d");
const download = document.querySelector('.download');
const pencilColor = document.querySelectorAll(".colors");
const pencilWidthElem = document.querySelector(".pencil__width");
const eraserWidthElem = document.querySelector(".eraser__width");
const redo = document.querySelector(".redo");
const undo = document.querySelector(".undo");
const reset = document.querySelector(".reset");

let penColor = "black";
let eraserColor = "white";
let penWidth = pencilWidthElem.value;
let eraserWidth = eraserWidthElem.value;


let undoRedoTracker = []; //store canvas image urls
let track = 0; // Represent which action undo or redo
let mouseDown = false;


/// set canvas width and height 
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


// set default canvas color and widht 
context.strokeStyle = penColor;
context.lineWidth = penWidth;
context.lineCap = "round";


canvas.addEventListener("mousedown" , (e) =>{
    mouseDown = true;
    let data = {
        x : e.clientX,
        y: e.clientY
    }
    beginPath(data);
    
})

canvas.addEventListener("mousemove" , (e) =>{
    if(mouseDown){
        
        let data = {
            x : e.clientX,
            y: e.clientY,
            color: eraserFlag? eraserColor: penColor,
            width : eraserFlag ? eraserWidth: penWidth
        }
        draw(data);
    }
    
})

canvas.addEventListener("mouseup" , () =>{
    mouseDown = false;

    let url = canvas.toDataURL();
    undoRedoTracker.push(url);
    operations = undoRedoTracker.length -1; 
})

function beginPath(strokeObj) {

    context.beginPath();
    context.moveTo(strokeObj.x, strokeObj.y);
}

function draw(strokeObj) {

    context.strokeStyle = strokeObj.color;
    context.lineWidth = strokeObj.width;
    context.lineTo(strokeObj.x, strokeObj.y);
    context.stroke();
}



// change pencil width
pencilWidthElem.addEventListener("change", (e) => {
    penWidth = pencilWidthElem.value;
    context.lineWidth = penWidth;
})

// change eraser width
eraserWidthElem.addEventListener("change", (e) => {
    eraserWidth = eraserWidthElem.value;
    context.lineWidth = eraserWidth;
})

// select eraser set color and width of eraser
eraser.addEventListener("click", (e) => {
    if (eraserFlag) {
        context.strokeStyle = eraserColor;
        context.lineWidth = eraserWidth;
    } else {
        context.strokeStyle = penColor;
        context.lineWidth = penWidth;
    }
})



// change color 
pencilColor.forEach( colorElem => {
    colorElem.addEventListener("click", (e) => {
        let color = colorElem.classList[0];
        penColor = color;
        context.strokeStyle = penColor;

        console.log(color);
    })
})



// download canvas image
download.onclick = () =>{
    let url = canvas.toDataURL();

    let a = document.createElement('a');
    a.href = url;
    a.download = "board.jpg";
    a.click(); 
}

// undo
undo.addEventListener("click", (e) => {
    if (track > 0) track--;
    // track action
    let data = {
        trackValue: track,
        undoRedoTracker
    }
    undoRedoCanvas(data);
})
redo.addEventListener("click", (e) => {
    if (track < undoRedoTracker.length-1) track++;
    // track action
    let data = {
        trackValue: track,
        undoRedoTracker
    }
    undoRedoCanvas(data);
})


function undoRedoCanvas(trackObj) {
    track = trackObj.trackValue;
    undoRedoTracker = trackObj.undoRedoTracker;

    let url = undoRedoTracker[track];
    let img = new Image(); // new image reference element
    img.src = url;
    img.onload = (e) => {
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
}

// resest clear all canvas

reset.onclick = () =>{
     context.clearRect(0,0,canvas.width, canvas.height);    
}