import * as tf from '@tensorflow/tfjs';
import { net } from './ai.js';


export const webcam = document.getElementById('webcam');
export const painting = document.getElementById('painting');
export const paintingContext = painting.getContext('2d');


export async function init() {
    await tf.data.webcam(webcam);
    painting.width = webcam.videoWidth;
    painting.height = webcam.videoHeight;
}


export async function update() {
    paintingContext.drawImage(webcam, 0, 0, painting.width, painting.height);
    const predictions = await net.estimateHands(webcam);
    if (predictions.length > 0) {
        dot(paintingContext, predictions[0].annotations.thumb[0]);
    }
    await tf.nextFrame();
}


function dot(ctx, position) {
    console.log(`${position}`);
    ctx.beginPath();
    ctx.arc(position[0], position[1], 8, 0, 2 * Math.PI);
    ctx.fill(); 
}