import { mode, mean, vectorMean } from './math.js';


export class Interpolator {
    constructor(length) {
        this.length = length;
        this.past = [];
    }


    interpolated() {
        const nonNull = this.past.filter(v => v != null);
        if (nonNull.length == 0) return null;
        return {
            gesture: mode(nonNull.map(hand => hand.gesture)),
            center: vectorMean(nonNull.map(hand => hand.center)),
            radius: mean(nonNull.map(hand => hand.radius))
        };
    }


    accumulate(hand) {
        this.past.push(hand);
        if (this.past.length > this.length) {
            this.past = this.past.slice(this.past.length - this.length, this.past.length);
        }
    }
};