import * as tf from '@tensorflow/tfjs';

import * as ai from './ai.js';
import * as webcam from './webcam.js';
import * as paint from './paint.js';
import * as ui from './ui.js';


async function main() {
    await ai.init();
    await webcam.init();
    await paint.init();
    await ui.init();
    while (true) {
        await paint.paint();
        await ui.update();
        await tf.nextFrame();
    }
}


main();