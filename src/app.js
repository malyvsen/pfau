import * as ai from './ai.js';
import * as hand from './hand.js';
import { Interpolator } from './interp.js';
import * as webcam from './webcam.js';
import * as paint from './paint.js';
import * as ui from './ui.js';


const states = {
    painting: 'painting',
    preMenu: 'preMenu',
    menu: 'menu',
    postMenu: 'postMenu'
};


let state = states.preMenu;
let brush = paint.brushes.brush;
const interpolator = new Interpolator(3);


export async function update() {
    const frame = await webcam.getFrame();
    const points = await ai.getPoints(frame);
    interpolator.accumulate(await hand.getHand(points));
    const cursor = interpolator.interpolated();
    switch (state) {
        case states.painting:
            if (cursor != null) await paint.paint(cursor, brush);
            await ui.drawPainting(frame, paint.painting);
            if (hand.checkGesture(cursor, hand.gestures.fist)) state = states.preMenu;
            break;
        case states.preMenu:
            await ui.drawMenu(frame, cursor);
            if (hand.checkGesture(cursor, hand.gestures.open)) state = states.menu;
            break;
        case states.menu:
            const choice = await ui.drawMenu(frame, cursor);
            switch (choice) {
                case ui.choices.brush:
                    brush = paint.brushes.brush;
                    state = states.postMenu;
                    break;
                case ui.choices.eraser:
                    brush = paint.brushes.eraser;
                    state = states.postMenu;
                    break;
            }
            break;
        case states.postMenu:
            await ui.drawPainting(frame, paint.painting);
            if (hand.checkGesture(cursor, hand.gestures.open)) state = states.painting;
            break;
    }
}