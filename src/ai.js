import * as handpose from '@tensorflow-models/handpose';


export let net;


export async function init() {
    net = await handpose.load();
}