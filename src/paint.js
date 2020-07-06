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
    const fingertips = ['thumb', 'indexFinger', 'middleFinger', 'ringFinger', 'pinky'].map(
        name => fingers[name][fingers[name].length - 1]
    );
    const dotCenter = fingers.middleFinger[0];
    const dotRadius = Math.sqrt(fingertips.map(
        tip => Math.pow(dotCenter[0] - tip[0], 2) + Math.pow(dotCenter[1] - tip[1], 2)
    ).reduce((cum, curr) => cum + curr, 0)) * 0.5;
    dot(paintingContext, dotCenter, dotRadius);
}


function dot(ctx, position, radius) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(position[0], position[1], radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore(); 
}