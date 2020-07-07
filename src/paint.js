import { webcam } from './webcam.js';
import { drawDot } from './utils.js';


export const painting = document.createElement('canvas');
const paintingContext = painting.getContext('2d');


export async function init() {
    painting.width = webcam.videoWidth;
    painting.height = webcam.videoHeight;
}


export async function paint(cursor) {
    drawDot(paintingContext, cursor.center, cursor.radius);
}