class Ship {
    constructor(length) {
        this.length = length;
        this.hits = 0;
    }

    getLength() {
        return this.length;
    }

    hit() {
        this.hits += 1;
    }

    isSunk() {
        return this.hits >= this.length;
    }
}

export {Ship};