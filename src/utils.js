import { gestures } from "./hand";


export function drawDot(ctx, position, radius) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(position[0], position[1], radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
}


export function drawImage(ctx, image, alpha=1) {
    ctx.save()
    ctx.globalAlpha = alpha;
    ctx.drawImage(image, 0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.restore();
}


export function drawButton(ctx, text, cursor, verticalOffset=0) {
    const screenCenter = [ctx.canvas.width / 2, ctx.canvas.height / 2];
    const size = [256, 64];

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
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillText(text, screenCenter[0], screenCenter[1] + verticalOffset);
    ctx.restore();

    if (cursor.gesture != gestures.fist) return false;
    return (
        cursor.center[0] >= screenCenter[0] - size[0] / 2 &&
        cursor.center[1] >= screenCenter[1] - size[1] / 2 &&
        cursor.center[0] <= screenCenter[0] + size[0] / 2 &&
        cursor.center[1] <= screenCenter[1] + size[1] / 2
    );
}