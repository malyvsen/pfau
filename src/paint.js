import { webcam } from './webcam.js';
import { getFingers } from './ai.js';


export const painting = document.createElement('canvas');
export const paintingContext = painting.getContext('2d');


export async function init() {
    painting.width = webcam.videoWidth;
    painting.height = webcam.videoHeight;
}


export async function paint() {
    const fingers = await getFingers();
    if (fingers == null) return;
    dot(paintingContext, fingers.thumb[0]);
}


function dot(ctx, position) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(position[0], position[1], 8, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore(); 
}