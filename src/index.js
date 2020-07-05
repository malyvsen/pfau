const tf = require('@tensorflow/tfjs');
const handpose = require('@tensorflow-models/handpose');


const webcam = document.getElementById('webcam');
const painting = document.getElementById('painting');
const paintingContext = painting.getContext('2d');
let net;


async function init() {
    net = await handpose.load();
    await tf.data.webcam(webcam);
    painting.width = webcam.videoWidth;
    painting.height = webcam.videoHeight;
}


async function updateUI() {
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


async function main() {
    await init();
    while (true) {
        await updateUI();
    }
}


main();