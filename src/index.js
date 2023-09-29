import { mainSetup, setupDisplay, updateDisplay, updateMessage } from './display';
import { Gameboard } from './gameboard';

import './style.css';

const test = 1;

const setup = () => {
    const length = 10;
    const width = 10;

    mainSetup();

    updateMessage('Setting up ...');

    for (let i = 0; i < 2; i++) {
        const gameboard = new Gameboard(length, width, i);
        setupDisplay(i, length, width);

        if (test) {
            // Preplaced test
            gameboard.placeShip(0 + i, 0 + i, 5, true);
            gameboard.placeShip(1 + i, 1 + i, 4, false);
            gameboard.placeShip(2 + i, 2 + i, 3, true);
            gameboard.placeShip(3 + i, 3 + i, 3, false);
            gameboard.placeShip(4 + i, 4 + i, 2, true);
        }

        updateDisplay(i, gameboard);
    }
};

setup();