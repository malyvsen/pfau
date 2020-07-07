import * as gesture from './gesture.js';


export const drawing = 'drawing';
export const menu = 'menu';


export let state = drawing;


export async function updateState(currentGesture) {
    state = currentGesture == gesture.open ? drawing : menu;
}