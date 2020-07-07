import { webcam } from './webcam.js';
import { drawImage, drawButton } from './utils.js';


export const choices = {
    none: 'none',
    brush: 'brush'
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
    if (drawButton(context, 'Back to drawing', cursor ? cursor.center : undefined)) return choices.brush;
    return choices.none;
}