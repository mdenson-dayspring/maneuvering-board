export class Contact {
    label: string;
    time: number;
    brg: number;
    rng: number;

    constructor(label: string, time: number, brg: number, rng: number) {
        this.label = label;
        this.time = time;
        this.brg = brg;
        this.rng = rng;
    }
    toUiPoint(): UIPoint {
        // remember 000T is at the top where a normal cartesian grid would be 90deg
        return {
            label: this.label,
            y: this.rng * Math.cos(this.brg * Math.PI / 180),
            x: this.rng * Math.sin(this.brg * Math.PI / 180),
        };
    }
}

export class UIPoint {
    label: string;
    x: number;
    y: number;
}
