const mainSetup = () => {
    const content = document.querySelector('#content');

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
};

const setupDisplay = (displayID, length, width) => {
    const boardDisplay = document.querySelector(`#board-display-${displayID}`);
    boardDisplay.style.gridTemplateColumns = `repeat(${length}, auto)`;
    boardDisplay.style.gridTemplateRows = `repeat(${width}, auto)`;
};

// display id = 0 || 1
const updateDisplay = (displayID, board) => {
    const boardDisplay = document.querySelector(`#board-display-${displayID}`);
    boardDisplay.innerHTML = '';

    const playerID = board.getBoardPlayerID();
    if (playerID === displayID)
        board.getGrid().forEach(element => {
            const gridElement = document.createElement('div');
            gridElement.setAttribute('data-x', element.x);
            gridElement.setAttribute('data-y', element.y);
            gridElement.setAttribute('data-hit', element.data[1]);

            // Temp?
            if (element.data[0])
                gridElement.textContent = 'S';

            boardDisplay.appendChild(gridElement);
        });
    else {
        board.getGrid().forEach(element => {
            const gridElement = document.createElement('div');
            gridElement.setAttribute('data-x', element.x);
            gridElement.setAttribute('data-y', element.y);
            gridElement.setAttribute('data-hit', element.data[1]);

            // Temp?
            if (element.data[1])
                gridElement.textContent = 'X';

            boardDisplay.appendChild(gridElement);
        });
    }
};

const updateMessage = (message) => {
    const messageDisplay = document.querySelector('#message-display');
    messageDisplay.textContent = message;
};

export {mainSetup, setupDisplay, updateDisplay, updateMessage};