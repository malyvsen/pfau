import * as tf from '@tensorflow/tfjs';

import * as ai from './ai.js';
import * as webcam from './webcam.js';
import * as paint from './paint.js';
import * as ui from './ui.js';


async function init() {
    await ai.init();
    await webcam.init();
    await paint.init();
    await ui.init();
}


async function main() {
    while (true) {
        const frame = await webcam.getFrame();
        const points = await ai.getPoints(frame);
        const painting = await paint.paint(points);
        await ui.update(frame, painting);
        await tf.nextFrame();
    }
}


init().then(_ => main());