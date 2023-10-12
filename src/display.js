let gameboards = []
const setGameboards = (gb) => { gameboards = gb; };

const mainSetup = () => {
    const content = document.querySelector('#content');
    content.setAttribute('data-state', 0);

    const messageDisplay = document.createElement('div');
    messageDisplay.id = 'message-display';
    content.appendChild(messageDisplay);

    const gameboardRow = document.createElement('div');
    gameboardRow.id = 'gameboard-row';
    for (let i = 0; i < 2; i++) {
        const gameboardDisplay = document.createElement('div');
        gameboardDisplay.id = `board-display-${i}`;
        gameboardRow.appendChild(gameboardDisplay);
    }
    content.appendChild(gameboardRow);

    const optionRow = document.createElement('div');
    optionRow.id = 'option-row';
    content.appendChild(optionRow);
    
    const vertical = document.createElement('input');
    vertical.id = 'vertical-checkbox';
    vertical.type = 'checkbox';
    optionRow.appendChild(vertical);
    const verticalLabel = document.createElement('label');
    verticalLabel.for = 'vertical-checkbox';
    verticalLabel.textContent = 'Vertical?';
    optionRow.appendChild(verticalLabel);
};

const setupDisplay = (displayID, length, width) => {
    const boardDisplay = document.querySelector(`#board-display-${displayID}`);
    boardDisplay.style.display = 'grid';
    boardDisplay.style.gridTemplateColumns = `repeat(${length}, auto)`;
    boardDisplay.style.gridTemplateRows = `repeat(${width}, auto)`;
};

function addShootEvent(button, board) {
    button.addEventListener('click', () => {
        const x = +button.getAttribute('data-x');
        const y = +button.getAttribute('data-y');
        const playerID = +button.getAttribute('data-side');
        const result = board.shoot(x, y);
        updateDisplay(playerID, board);

        // End
        if (result) {
            updateDisplay(1, gameboards[1]);

            if (gameboards[0].checkEndCondition()) updateMessage(`${gameboards[1].getPlayer().getName()} Wins!`);
            else updateMessage(`${gameboards[0].getPlayer().getName()} Wins!`);
        }
    });
}

function addShipEvent(button, board) {
    button.addEventListener('click', () => {
        const x = +button.getAttribute('data-x');
        const y = +button.getAttribute('data-y');
        const length = board.getPendingShips()[0];
        const vertical = document.querySelector('#vertical-checkbox').checked;
        if (board.placeShip(x, y, length, vertical) !== false) {
            board.getPendingShips().shift();

            if (board.getPendingShips().length === 0) {
                const content = document.querySelector('#content');
                content.setAttribute('data-state', 1);
                updateMessage('Choose a coordinate to shoot.');

                for (let i = 0; i < 2; i++)
                    updateDisplay(i, gameboards[i]);

                document.querySelector('#option-row').classList.add('hide');
                document.querySelector('#auto-place-button').disabled = true;
            }
            else {
                const nextShip = board.getPendingShips()[0];
                updateMessage(`Place your ship: Ship(${nextShip})`);
                updateDisplay(0, board);
            }

        }
    });
}

function addColorEvent(button, board) {
    button.addEventListener('mouseover', () => {
        const x = +button.getAttribute('data-x');
        const y = +button.getAttribute('data-y');
        const length = board.getPendingShips()[0];
        const vertical = document.querySelector('#vertical-checkbox').checked;

        let color = 'red';
        if (board.verifyShipPlacement(x, y, length, vertical)) color = 'green';

        for (let i = 0; i < length; i++) {
            let targetX = x;
            let targetY = y;
            if (vertical) targetY = y + i; 
            else targetX = x + i;

            const item = document.querySelector(`.gameboard-item-0-${targetX}-${targetY}`);
            if (item)
                item.classList.add(color);
        }
    });
    button.addEventListener('mouseout', () => {
        const x = +button.getAttribute('data-x');
        const y = +button.getAttribute('data-y');
        const length = board.getPendingShips()[0];
        const vertical = document.querySelector('#vertical-checkbox').checked;
        for (let i = 0; i < length; i++) {
            let targetX = x;
            let targetY = y;
            if (vertical) targetY = y + i; 
            else targetX = x + i;

            const item = document.querySelector(`.gameboard-item-0-${targetX}-${targetY}`);
            if (item)
                item.classList.remove('red', 'green');
        }
    });
}

const createGameboardObject = (element, displayID, board, gameState) => {
    const gameboardItem = document.createElement('button');
    gameboardItem.classList.add(`gameboard-item-${displayID}-${element.x}-${element.y}`);
    gameboardItem.setAttribute('data-side', displayID);
    gameboardItem.setAttribute('data-x', element.x);
    gameboardItem.setAttribute('data-y', element.y);

    // Enemy board
    if (displayID === 1) {
        if (gameState !== '1') gameboardItem.disabled = true;

        if (element.data[1]) {
            gameboardItem.disabled = true;
            if (element.data[0]) {
                gameboardItem.classList.add('ship-hit');
            }
        }
        else {
            gameboardItem.setAttribute('data-hit', element.data[1]);
            addShootEvent(gameboardItem, board);    
        }
    }
    else {
        // Player board, ship placement stage
        if (gameState === '0' && !element.data[0]) {
            addShipEvent(gameboardItem, board);
            addColorEvent(gameboardItem, board);
        }
        else {
            if (element.data[0]) gameboardItem.classList.add('has-ship');
            gameboardItem.disabled = true;
        }
    }

    return gameboardItem;
}

// display id = 0 || 1
const updateDisplay = (displayID, board) => {
    const boardDisplay = document.querySelector(`#board-display-${displayID}`);
    boardDisplay.innerHTML = '';

    board.getGrid().forEach(element => {
        const gameState = document.querySelector('#content').getAttribute('data-state');
        const gameboardItem = createGameboardObject(element, displayID, board, gameState);

        if (element.data[displayID] && displayID === 0)
            gameboardItem.textContent = element.data[displayID].getLength();
        else if (element.data[displayID] && displayID === 1) {
            let displayText = 'X';

            const ship = element.data[0];
            if (ship && ship.isSunk()) {
                displayText = ship.getLength();
            }

            gameboardItem.textContent = displayText;
        }

        boardDisplay.appendChild(gameboardItem);
    });
};

const updateMessage = (message) => {
    const messageDisplay = document.querySelector('#message-display');
    messageDisplay.textContent = message;
};

export {setGameboards, mainSetup, setupDisplay, updateDisplay, updateMessage};