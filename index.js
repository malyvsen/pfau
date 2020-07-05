const webcam = document.getElementById('webcam');
const painting = document.getElementById('painting');
const paintingContext = painting.getContext('2d');
let net;


async function init() {
    net = await handpose.load();
    await tf.data.webcam(webcam);
    // TODO: set canvas width, height?
}


async function updateUI() {
    // const result = await net.estimateHands(webcam);
    // console.log(result);
    paintingContext.drawImage(webcam, 0, 0, painting.width, painting.height);
    await tf.nextFrame();
}


async function main() {
    await init();
    while (true) {
        await updateUI();
    }
}


main();