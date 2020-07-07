import { webcam } from './webcam.js';
import { drawImage, drawButton } from './utils.js';


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


export async function drawPainting(frame, painting) {
    drawImage(context, frame);
    drawImage(context, painting, 0.5);
}


export async function drawMenu(frame, cursor) {
    drawImage(context, frame);
    let choice = choices.none;
    if (drawButton(context, 'brush', cursor, [0, 64])) choice = choices.brush;
    if (drawButton(context, 'eraser', cursor, [0, -64])) choice = choices.eraser;
    return choice;
}