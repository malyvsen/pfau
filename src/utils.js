import { gestures } from "./hand";


export function drawDot(ctx, position, radius, fillStyle='black', blendMode='source-over') {
    ctx.save();
    ctx.globalCompositeOperation = blendMode;
    ctx.fillStyle = fillStyle;
    ctx.beginPath();
    ctx.arc(position[0], position[1], radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
}


export function eraseDot(ctx, position, radius) {
    drawDot(ctx, position, radius, 'black', 'destination-out');
}


export function drawImage(ctx, image, alpha=1) {
    ctx.save()
    ctx.globalAlpha = alpha;
    ctx.drawImage(image, 0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.restore();
}


export function drawButton(ctx, text, cursor, centerOffset=[0, 0]) {
    const center = [
        ctx.canvas.width / 2 + centerOffset[0],
        ctx.canvas.height / 2 + centerOffset[1]
    ];
    const size = [256, 64];
    const cursorIn = cursor && inBox(cursor.center, center, size);

    ctx.save();
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = cursorIn ? 'gray' : 'white';
    ctx.fillRect(
        center[0] - size[0] / 2,
        center[1] - size[1] / 2,
        ...size
    );

    ctx.fillStyle = 'black';
    ctx.font = '24px Major Mono Display';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillText(text, center[0], center[1]);
    ctx.restore();

    if (!cursor || cursor.gesture != gestures.fist) return false;
    return cursorIn;
}


function inBox(position, boxCenter, boxSize) {
    return (
        position[0] >= boxCenter[0] - boxSize[0] / 2 &&
        position[1] >= boxCenter[1] - boxSize[1] / 2 &&
        position[0] <= boxCenter[0] + boxSize[0] / 2 &&
        position[1] <= boxCenter[1] + boxSize[1] / 2
    );
}