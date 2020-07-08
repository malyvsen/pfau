import * as tf from '@tensorflow/tfjs';


export const webcam = document.createElement('video');


export async function init() {
    await tf.data.webcam(webcam);
}


export async function getFrame() {
    const canvas = document.createElement('canvas');
    canvas.width = webcam.videoWidth;
    canvas.height = webcam.videoHeight;
    const context = canvas.getContext('2d');
    context.setTransform(-1, 0, 0, 1, canvas.width, 0);
    context.drawImage(webcam, 0, 0, canvas.width, canvas.height);
    return canvas;
}