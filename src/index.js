import { mainSetup, setupDisplay, updateDisplay, updateMessage } from './display';
import { Gameboard } from './gameboard';

import './style.css';

const test = 0;

const generateShipPlacements = (gameboard, shipLengthArray) => {
    const shipLengths = [...shipLengthArray];
    while (shipLengths.length > 0) {
        const shipLength = shipLengths[0];
        const x = Math.floor(Math.random() * (gameboard.getLength() - shipLength));
        const y = Math.floor(Math.random() * (gameboard.getWidth() - shipLength));
        const vert = !!Math.floor(Math.random() * 2);

        console.log(shipLengths, 'Attempt:', shipLength, x, y, vert);

        const ship = gameboard.placeShip(x, y, shipLength, vert);
        if (ship !== false) {
            shipLengths.shift();
        }
    }
}

const setup = () => {
    const length = 10;
    const width = 10;

    mainSetup();

    updateMessage('Setting up ...');

    const gameboards = [];
    for (let i = 0; i < 2; i++) {
        const gameboard = new Gameboard(length, width, i);
        gameboards.push(gameboard);

        setupDisplay(i, length, width);
    }

    // Ai board
    const shipLengths = [5, 4, 3, 3, 2];
    for (let i = test; i < 2; i++) {
        generateShipPlacements(gameboards[i], shipLengths);
        updateDisplay(i, gameboards[i]);
    }

    updateMessage('Finished setting up');
};

setup();