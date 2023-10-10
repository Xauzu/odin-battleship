import { mainSetup, setupDisplay, updateDisplay, updateMessage } from './display';
import { Gameboard } from './gameboard';

import './style.css';

const test = 1;
const gameboards = [];

const generateShipPlacements = (gameboard, shipLengthArray) => {
    const shipLengths = [...shipLengthArray];
    while (shipLengths.length > 0) {
        const shipLength = shipLengths[0];
        const x = Math.floor(Math.random() * (gameboard.getLength() - shipLength + 1));
        const y = Math.floor(Math.random() * (gameboard.getWidth() - shipLength + 1));
        const vert = !!Math.floor(Math.random() * 2);

        const ship = gameboard.placeShip(x, y, shipLength, vert);
        if (ship !== false) {
            shipLengths.shift();
        }
    }
}

const addTestButtons = function addTestButtons(length, width) {
    const content = document.querySelector('#content');

    const buttonContainer = document.createElement('div');
    buttonContainer.id = 'action-button-container';
    content.appendChild(buttonContainer);

    const autoPlaceButton = document.createElement('button');
    autoPlaceButton.id = 'auto-place-button';
    autoPlaceButton.textContent = 'Auto Place Ships';
    autoPlaceButton.addEventListener('click', () => {
        generateShipPlacements(gameboards[0], [5, 4, 3, 3, 2])
        updateDisplay(0, gameboards[0]);
    }); // Temp hardcoded array
    buttonContainer.appendChild(autoPlaceButton);

    const shootAllButton = document.createElement('button');
    shootAllButton.id = 'shoot-all-button';
    shootAllButton.textContent = 'Shoot All Coordinates';
    shootAllButton.addEventListener('click', () => {
        for (let i = 0; i < length * width; i++) {
            const x = i % length;
            const y = Math.floor(i / length);
            gameboards[1].getCoordinate(x, y).shoot();
        }
        updateDisplay(1, gameboards[1]);
    }); // Temp hardcoded array
    buttonContainer.appendChild(shootAllButton);
}

// eslint-disable-next-line no-unused-vars
const setup = (function setup() {
    const length = 10;
    const width = 10;

    mainSetup();

    updateMessage('Setting up ...');

    for (let i = 0; i < 2; i++) {
        const gameboard = new Gameboard(length, width, i);
        gameboards.push(gameboard);

        setupDisplay(i, length, width);
    }

    const shipLengths = [5, 4, 3, 3, 2];
    for (let i = 0; i < 2; i++) {
        // Ai board
        if (i === 1)
            generateShipPlacements(gameboards[i], shipLengths);
        updateDisplay(i, gameboards[i]);
    }

    if (test) addTestButtons(length, width);

    updateMessage('Finished setting up');
})();