import { webcam } from './webcam.js';


const preview = document.getElementById('preview');
const previewContext = preview.getContext('2d');


export async function init() {
    preview.width = webcam.videoWidth;
    preview.height = webcam.videoHeight;
}


export async function update(frame, painting) {
    drawImage(previewContext, frame);
    drawImage(previewContext, painting, 0.5);
}


function drawImage(ctx, image, alpha=1) {
    ctx.save()
    ctx.globalAlpha = alpha;
    ctx.drawImage(image, 0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.restore();
}