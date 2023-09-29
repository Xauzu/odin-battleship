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
    boardDisplay.style.display = 'grid';
    boardDisplay.style.gridTemplateColumns = `repeat(${length}, auto)`;
    boardDisplay.style.gridTemplateRows = `repeat(${width}, auto)`;
};

const createGameboardObject = (element) => {
    const gameboardItem = document.createElement('button');
    gameboardItem.classList.add('gameboard-item');
    gameboardItem.setAttribute('data-x', element.x);
    gameboardItem.setAttribute('data-y', element.y);
    gameboardItem.setAttribute('data-hit', element.data[1]);

    return gameboardItem;
}

// display id = 0 || 1
const updateDisplay = (displayID, board) => {
    const boardDisplay = document.querySelector(`#board-display-${displayID}`);
    boardDisplay.innerHTML = '';

    board.getGrid().forEach(element => {
        const gameboardItem = createGameboardObject(element);

        // Temp?
        if (element.data[displayID] && displayID === 0)
            gameboardItem.textContent = 'S';
        else if (element.data[displayID] && displayID === 1)
            gameboardItem.textContent = 'X';

        boardDisplay.appendChild(gameboardItem);
    });
};

const updateMessage = (message) => {
    const messageDisplay = document.querySelector('#message-display');
    messageDisplay.textContent = message;
};

export {mainSetup, setupDisplay, updateDisplay, updateMessage};