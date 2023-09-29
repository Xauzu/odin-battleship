import {Coordinate} from './coordinate';
import {Ship} from './ship';

class Gameboard {
    constructor(length, width, playerID) {
        // Grid size 10x10
        // playerID 0=main, 1=player2
        this.length = length;
        this.width = width;
        this.grid = Array(length * width).fill();
        this.playerID = playerID || 0;
        this.#populateGrid();
    }

    #populateGrid() {
        for (let i = 0; i < this.length * this.width; i++) {
            const x = i % this.length;
            const y = Math.floor(i / this.length);
            const coord = new Coordinate(x, y);
            this.grid[i] = coord;
        }
    }

    getGrid() { return this.grid; }

    placeShip(x, y, length, vertical) {
        const newShip = new Ship(length);
        let success = false;
        if (vertical && y + length < this.width) {
            for (let i = y; i < y + length; i++) {
                const coord = this.getCoordinate(x, i);
                coord.setShip(newShip);
            }
            success = true;
        }
        else if (!vertical && x + length < this.length) {
            for (let i = x; i < x + length; i++) {
                const coord = this.getCoordinate(i, y);
                coord.setShip(newShip);
            }
            success = true;
        }
        
        return success ? newShip : false;
    }

    getCoordinate(x, y) { return this.grid[x + y * this.length]; }

    getCoordinateData(x, y) { return this.grid[x + y * this.length].getData(); }

    receiveAttack(x, y) {
        const coord = this.getCoordinate(x, y);
        coord.shoot();
        // Ship or null
        if (coord[0])
            coord[0].hit();
    }

    displayShipGrid() {
        let result = '';
        for (let i = 0; i < this.length * this.width; i++) {
            const x = i % this.length;
            const y = Math.floor(i / this.length);

            if (x % this.length === 0) result += '\n'
            const data = this.getCoordinateData(x, y)[0];
            if (data) result += 'S';
            else result += '-';
        }
        console.log(result);
    }

    getBoardPlayerID() { return this.playerID; }
}

export {Gameboard, Coordinate};