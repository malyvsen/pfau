import { webcam } from './webcam.js';


const painting = document.createElement('canvas');
const paintingContext = painting.getContext('2d');


export async function init() {
    painting.width = webcam.videoWidth;
    painting.height = webcam.videoHeight;
}


export async function paint(points) {
    if (points == null) return painting;
    const controlPoints = ['thumb', 'pinky'].map(
        name => points[name][points[name].length - 1]
    );
    const dotCenter = controlPoints.reduce(
        (cum, curr) => [cum[0] + curr[0], cum[1] + curr[1]],
        [0, 0]
    ).map(val => val / controlPoints.length);
    const dotRadius = Math.sqrt(controlPoints.map(
        point => Math.pow(dotCenter[0] - point[0], 2) + Math.pow(dotCenter[1] - point[1], 2)
    ).reduce((cum, curr) => cum + curr, 0)) * 0.75;
    dot(paintingContext, dotCenter, dotRadius);
    return painting;
}


function dot(ctx, position, radius) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(position[0], position[1], radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore(); 
}