import { setGameboards, mainSetup, setupDisplay, updateDisplay, updateMessage } from './display';
import { Gameboard } from './gameboard';

import './style.css';

const test = 1;
const gameboards = [];

// 0 = ship placement
// 1 = game
// 2 = end
function updateGameState(state) {
    const content = document.querySelector('#content');
    content.setAttribute('data-state', state);
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
        autoPlaceButton.disabled = true;
        gameboards[0].generateShipPlacement(gameboards[0].getPendingShips());
        updateGameState(1);
        for (let i = 0; i < 2; i++)
            updateDisplay(i, gameboards[i]);
        updateMessage('Choose a coordinate to shoot.');
    });
    buttonContainer.appendChild(autoPlaceButton);

    const shootAllButton = document.createElement('button');
    shootAllButton.id = 'shoot-all-button';
    shootAllButton.textContent = 'Shoot All Coordinates';
    shootAllButton.addEventListener('click', () => {
        shootAllButton.disabled = true;
        for (let i = 0; i < length * width; i++) {
            const x = i % length;
            const y = Math.floor(i / length);
            gameboards[1].getCoordinate(x, y).shoot();
        }

        for (let i = 0; i < 2; i++)
            updateDisplay(i, gameboards[i]);
    });
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
    setGameboards(gameboards);

    // const shipLengths = [5, 4, 3, 3, 2];
    for (let i = 0; i < 2; i++) {
        // Ai board
        if (i === 1)
            gameboards[i].generateShipPlacement();
        updateDisplay(i, gameboards[i]);
    }

    if (test) addTestButtons(length, width);

    updateMessage('Finished setting up');

    updateGameState(0);

    const nextShip = gameboards[0].getPendingShips()[0];
    updateMessage(`Place your ship: Ship(${nextShip})`);
})();