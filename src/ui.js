import { webcam } from './webcam.js';
import * as state from './state.js';


const preview = document.getElementById('preview');
const previewContext = preview.getContext('2d');


export async function init() {
    preview.width = webcam.videoWidth;
    preview.height = webcam.videoHeight;
}


export async function update(frame, painting, currentState) {
    drawImage(previewContext, frame);
    switch (currentState) {
        case state.menu:
            drawText(previewContext, 'Menu placeholder');
            break;
        case state.drawing:
            drawImage(previewContext, painting, 0.5);
            break;
    }
}


function drawImage(ctx, image, alpha=1) {
    ctx.save()
    ctx.globalAlpha = alpha;
    ctx.drawImage(image, 0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.restore();
}


function drawText(ctx, text) {
    ctx.save();
    ctx.font = '50px Poiret One';
    ctx.textAlign = 'center';
    ctx.fillText(text, ctx.canvas.width / 2, ctx.canvas.height / 2);
    ctx.restore();
}