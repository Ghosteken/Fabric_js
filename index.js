// console.log("I am index.js");


// const canvas = new fabric.Canvas('canvas',{
//     width: 500,
//     height: 500,
//     // backgroundColor:'red',


// });

// canvas.renderAll();
// fabric.Image.fromURL('https://cdn.pixabay.com/photo/2017/03/17/19/37/sky-2152463_960_720.jpg',(img)=>{
//     canvas.backgroundImage = img
//     canvas.renderAll();
// });

const initCanvas = (id) => {
    return new fabric.Canvas(id,{
        width: 500,
        height: 500,
        selection: false
    });
   
} 

const setBackground = (url, canvas) => {
    fabric.Image.fromURL(url,(img)=>{
    canvas.backgroundImage = img
    canvas.renderAll();
});

}

const canvas = initCanvas("canvas");
let mousePressed = false;

setBackground('https://cdn.pixabay.com/photo/2017/03/17/19/37/sky-2152463_960_720.jpg',canvas);


let currentMode;
const modes = {
    pan:'pan',
    drawing:'drawing',
}

const toggleMode = (mode) => {

    if (mode === modes.pan) {
        
    if (currentMode == modes.pan){
        currentMode = ''
    }else {
        currentMode = modes.pan
        canvas.isDrawingMode = false
        canvas.renderAll();
    }
    }else if (currentMode === modes.drawing){
        if (currentMode == modes.drawing){
            currentMode = ''
            canvas.isDrawingMode = false;
            canvas.renderAll();
        }else {
            canvas.freeDrawingBrush.color = color
            currentMode = modes.drawing
            canvas.isDrawingMode = true;
            canvas.renderAll();
        }
    }

    console.log(mode)
}

const setPanEvents = (canvas) => {
//mouse over
canvas.on('mouse:move',(event)=>{
    // console.log(event)
    if (mousePressed && currentMode == modes.pan ){
        canvas.setCursor('grab')
        canvas.renderAll()
        const mEvent = event.e;
        const delta = new fabric.Point(mEvent.movementX, mEvent.movementY);
        canvas.reletivePan(delta)
    }
});
    
// keep track of mouse down/up
canvas.on('mouse:down',(event)=>{
    mousePressed = true;
    if (mousePressed && currentMode == modes.pan ){
        canvas.setCursor('grab')
        canvas.renderAll()
    }
    
    
});

canvas.on('mouse:up',(event)=>{
    mousePressed = false;
    canvas.setCursor('default');
    canvas.renderAll()
});
}

setPanEvents(canvas);