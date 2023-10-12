import {Coordinate} from './coordinate';
import {Ship} from './ship';

class Gameboard {
    constructor(length, width, playerID, pendingShipList) {
        // Grid size 10x10
        // playerID 0=main, 1=player2
        this.length = length;
        this.width = width;
        this.grid = Array(length * width).fill();
        this.playerID = playerID || 0;
        this.pendingShipList = pendingShipList || [5, 4, 3, 3, 2];
        this.#populateGrid();
    }

    setPlayer(gamePlayer) { this.player = gamePlayer; };

    getPlayer() { return this.player; };

    getLength() { return this.length; };

    getWidth() { return this.width; };

    getPendingShips() { return this.pendingShipList; };

    #populateGrid() {
        for (let i = 0; i < this.length * this.width; i++) {
            const x = i % this.length;
            const y = Math.floor(i / this.length);
            const coord = new Coordinate(x, y);
            this.grid[i] = coord;
        }
    }

    getGrid() { return this.grid; }

    verifyShipPlacement(x, y, length, vertical) {
        let valid = 0;
        for (let i = 0; i < length; i++) {
            if (vertical && y + i < this.width && this.getCoordinateData(x, y + i)[0] === null) valid += 1; 
            else if (!vertical && x + i < this.length && this.getCoordinateData(x + i, y)[0] === null) valid += 1;
        }
        return valid === length;
    }

    placeShip(x, y, length, vertical) {
        const newShip = new Ship(length);
        let success = false;

        if (vertical) {
            if (this.verifyShipPlacement(x, y, length, vertical)) {
                for (let i = 0; i < length; i++) {
                    const coord = this.getCoordinate(x, y + i);
                    coord.setShip(newShip);
                }
                success = true;
            }
        }
        else {
            if (this.verifyShipPlacement(x, y, length, vertical)) {
                for (let i = 0; i < length; i++) {
                    const coord = this.getCoordinate(x + i, y);
                    coord.setShip(newShip);
                }
                success = true;
            }
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
        // eslint-disable-next-line no-console
        console.log(result);
    }

    getBoardPlayerID() { return this.playerID; }

    generateShipPlacement(shipLengthArray) {
        const shipLengths = shipLengthArray ? [...shipLengthArray] : this.pendingShipList;
        while (shipLengths.length > 0) {
            const shipLength = shipLengths[0];
            const x = Math.floor(Math.random() * (this.length - shipLength + 1));
            const y = Math.floor(Math.random() * (this.width - shipLength + 1));
            const vert = !!Math.floor(Math.random() * 2);
    
            const ship = this.placeShip(x, y, shipLength, vert);
            if (ship !== false) {
                shipLengths.shift();
            }
        }
    }

    checkEndCondition() {
        let hits = 0;
        let shipParts = 0;
        for (let i = 0; i < this.grid.length; i++) {
            const x = i % this.length;
            const y = Math.floor(i / this.length);
            const coordData = this.getCoordinateData(x, y);
            if (coordData[0]) {
                shipParts += 1;
                if (coordData[1]) hits += 1;
            }
        }

        return hits === shipParts;
    }

    isValidShot(x, y) {
        let valid = true;
        if (x < 0 || x > this.length || y < 0 || y > this.width) valid = false;
        if (this.getCoordinateData(x, y)[1] === true) valid = false;
        return valid;
    }

    shoot(x, y) {
        if (this.isValidShot(x, y)) {
            this.getCoordinate(x, y).shoot();
            if (this.checkEndCondition()) {
                document.querySelector('#content').setAttribute('data-state', 2);
                return true;
            }
        }
        return false;
    }

}

export {Gameboard};