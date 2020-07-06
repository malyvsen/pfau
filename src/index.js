import * as tf from '@tensorflow/tfjs';

import * as ai from './ai.js';
import * as gesture from './gesture.js';
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
        const currentGesture = await gesture.getGesture(points);
        switch (currentGesture) {
            case gesture.open:
                await paint.paint(points);
        }
        await ui.update(frame, paint.painting);
        await tf.nextFrame();
    }
}


init().then(_ => main());