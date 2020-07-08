import { webcam } from './webcam.js';
import { drawDot, eraseDot } from './utils/canvas.js';


export const brushes = {
    brush: 'brush',
    eraser: 'eraser'
};


export const painting = document.createElement('canvas');
const paintingContext = painting.getContext('2d');


export async function init() {
    painting.width = webcam.videoWidth;
    painting.height = webcam.videoHeight;
}


export async function paint(cursor, brush) {
    switch (brush) {
        case brushes.brush:
            drawDot(paintingContext, cursor.center, cursor.radius)
            break;
        case brushes.eraser:
            eraseDot(paintingContext, cursor.center, cursor.radius);
            break;
    }
}