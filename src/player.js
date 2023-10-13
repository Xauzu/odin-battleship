class Player {
    constructor(name, isAi) {
        this.name = name;
        this.isAi = isAi || false;
        if (isAi) {
            this.aiStack = [];
        }
    }

    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    shootRandom(board) {
        let result = -1;
        let x = 0;
        let y = 0;
        while (result === -1) {
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);
            result = board.shoot(x, y);
        }

        if (board.getCoordinateData(x, y)[0] && board.getCoordinateData(x, y)[1]) {
            this.successfulShot = [board.getCoordinateData(x, y)[0], x, y];
            const offsetArray = [
                [board.getCoordinateData(x, y)[0], x, y],
                [null, x, y - 1],
                [null, x + 1, y],
                [null, x, y + 1],
                [null, x - 1, y]
            ];
            this.aiStack = [...this.aiStack, ...offsetArray];
        }
    }

    shootStack(board) {
        let [ship, x, y] = this.aiStack.pop();
        let shot = board.shoot(x, y);
        while (shot === -1 && this.aiStack.length > 0) {
            [ship, x, y] = this.aiStack.pop();
            shot = board.shoot(x, y); 
        }

        if (shot === -1) {
            this.shootRandom(board);
        }

        const coordShip = board.getCoordinateData(x, y)[0];
        if (coordShip) {
            if (board.getCoordinateData(x, y)[0].isSunk()) {
                // remove the rest of null ships
                let shipCheck = this.aiStack[this.aiStack.length - 1];
                while (this.aiStack.length > 0 && shipCheck[0] === null) {
                    this.aiStack.pop();
                    shipCheck = this.aiStack[this.aiStack.length - 1];
                }
            }
            else {
                const diffX = x - this.successfulShot[1];
                const diffY = y - this.successfulShot[2];
                this.aiStack.push([null, x + diffX, y + diffY]);
                this.successfulShot = [board.getCoordinateData(x, y)[0], x, y];
            }
        }
    }

    shootNext(board) {
        if (this.aiStack.length === 0) this.shootRandom(board);
        else this.shootStack(board);
    }
}

export {Player};