import { webcam, getFrame } from './webcam.js';
import { painting } from './paint.js';


export const preview = document.getElementById('preview');
export const previewContext = preview.getContext('2d');


export async function init() {
    preview.width = webcam.videoWidth;
    preview.height = webcam.videoHeight;
}


export async function update() {
    drawImage(previewContext, await getFrame());
    drawImage(previewContext, painting);
}


function drawImage(ctx, image) {
    ctx.drawImage(image, 0, 0, ctx.canvas.width, ctx.canvas.height);
}