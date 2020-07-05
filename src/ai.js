import * as handpose from '@tensorflow-models/handpose';


let net;


export async function init() {
    net = await handpose.load();
}


export async function getFingers() {
    const predictions = await net.estimateHands(webcam);
    if (predictions.length == 0) return null;
    return predictions[0].annotations;
}