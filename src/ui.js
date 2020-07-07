import { webcam } from './webcam.js';


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
    if(drawButton(context, 'Back to drawing', cursor ? cursor.center : undefined)) return choices.brush;
    return choices.none;
}


function drawImage(ctx, image, alpha=1) {
    ctx.save()
    ctx.globalAlpha = alpha;
    ctx.drawImage(image, 0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.restore();
}


function drawButton(ctx, text, cursorPos, verticalOffset=0) {
    const screenCenter = [ctx.canvas.width / 2, ctx.canvas.height / 2];
    const size = [128, 64];

    ctx.save();
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = 'white';
    ctx.fillRect(
        screenCenter[0] - size[0] / 2,
        screenCenter[1] - size[1] / 2,
        ...size
    );

    ctx.fillStyle = 'black';
    ctx.font = '24px Poiret One';
    ctx.textAlign = 'center';
    ctx.fillText(text, screenCenter[0], screenCenter[1] + verticalOffset);
    ctx.restore();

    if (cursorPos == undefined) return false;
    return (
        cursorPos[0] >= screenCenter[0] - size[0] / 2 &&
        cursorPos[1] >= screenCenter[1] - size[1] / 2 &&
        cursorPos[0] <= screenCenter[0] + size[0] / 2 &&
        cursorPos[1] <= screenCenter[1] + size[1] / 2
    );
}