class Coordinate {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.data = [null, false];
    }

    getData() {
        return this.data;
    }

    setShip(ship) {
        this.data[0] = ship;
    }

    shoot() {
        this.data[1] = true;
    }

    isShot() {
        return this.data[1];
    }
}

export {Coordinate};