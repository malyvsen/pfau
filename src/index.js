import * as tf from '@tensorflow/tfjs';

import * as ai from './ai.js';
import * as webcam from './webcam.js';
import * as paint from './paint.js';
import * as ui from './ui.js';
import * as app from './app.js';


async function init() {
    await ai.init();
    await webcam.init();
    await paint.init();
    await ui.init();
}


async function main() {
    while (true) {
        await app.update();
        await tf.nextFrame();
    }
}


init().then(_ => main());