import { webcam } from './webcam.js';
import { drawImage, drawButton, drawDot } from './utils/canvas.js';


export const choices = {
    none: 'none',
    brush: 'brush',
    eraser: 'eraser'
};


const canvas = document.getElementById('uiCanvas');
const context = canvas.getContext('2d');


export async function init() {
    canvas.width = webcam.videoWidth;
    canvas.height = webcam.videoHeight;
}


export async function drawPainting(frame, painting, cursor) {
    drawImage(context, frame);
    drawImage(context, painting, alpha);
    if(cursor) drawDot(context, cursor.center, cursor.radius, `rgba(127, 0, 127, ${alpha})`);
}


export async function drawMenu(frame, cursor) {
    drawImage(context, frame);
    let choice = choices.none;
    if (drawButton(context, 'brush', cursor, [0, 64], alpha)) choice = choices.brush;
    if (drawButton(context, 'eraser', cursor, [0, -64], alpha)) choice = choices.eraser;
    return choice;
}


const alpha = 0.75;