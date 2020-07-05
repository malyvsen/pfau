import * as tf from '@tensorflow/tfjs';


export const webcam = document.getElementById('webcam');


export async function init() {
    await tf.data.webcam(webcam);
}