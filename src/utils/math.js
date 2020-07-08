export const sum = arr => arr.reduce((cum, curr) => cum + curr, 0);


export function mean(arr) {
    if (arr.length == 0) return null;
    return arr.reduce((curr, cum) => curr + cum) / arr.length;
}


export function vectorMean(arr) {
    if (arr.length == 0) return null;
    return vectorMult(
        arr.reduce(
            (curr, cum) => vectorSum(curr, cum)
        ),
        1.0 / arr.length
    );
};


export const vectorSum = (a, b) => a.map(
    (aVal, idx) => aVal + b[idx]
);


export const vectorMult = (vector, scalar) => vector.map(
    (entry) => entry * scalar
);


export const mode = (arr) => arr.slice().sort(
    (a, b) =>
    arr.filter(v => v === a).length -
    arr.filter(v => v === b).length
).pop();