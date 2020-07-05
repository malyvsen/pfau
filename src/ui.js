import { webcam } from './webcam.js';
import { painting } from './paint.js';


export const preview = document.getElementById('preview');
export const previewContext = preview.getContext('2d');


export async function init() {
    preview.width = webcam.videoWidth;
    preview.height = webcam.videoHeight;
}


export async function update() {
    previewContext.drawImage(webcam, 0, 0, preview.width, preview.height);
    previewContext.drawImage(painting, 0, 0, preview.width, preview.height);
}