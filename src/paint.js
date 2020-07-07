import { webcam } from './webcam.js';
import { getFingerPoints, getDistanceSquared } from './gesture.js';


export const painting = document.createElement('canvas');
const paintingContext = painting.getContext('2d');


export async function init() {
    painting.width = webcam.videoWidth;
    painting.height = webcam.videoHeight;
}


export async function paint(cursor) {
    dot(paintingContext, cursor.center, cursor.radius);
}


function dot(ctx, position, radius) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(position[0], position[1], radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore(); 
}