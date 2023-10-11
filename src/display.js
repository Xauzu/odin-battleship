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
        board.getCoordinate(x, y).shoot();
        // eslint-disable-next-line no-use-before-define
        updateDisplay(playerID, board);
    });
}

function addColorEvent(button, board, color) {
    
}

const createGameboardObject = (element, displayID, board, gameState) => {
    const gameboardItem = document.createElement('button');
    gameboardItem.classList.add('gameboard-item');
    gameboardItem.setAttribute('data-side', displayID);
    gameboardItem.setAttribute('data-x', element.x);
    gameboardItem.setAttribute('data-y', element.y);

    // Enemy board
    if (displayID === 1) {
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

export {mainSetup, setupDisplay, updateDisplay, updateMessage};