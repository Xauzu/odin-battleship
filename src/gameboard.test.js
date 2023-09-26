import {Gameboard} from './gameboard';

const gb = new Gameboard(10, 10);

test('Gameboard exist', () => {
    expect(gb).toBeTruthy();
    expect(gb.getGrid()).toBeTruthy();
});

test('Gameboard getCoordinate', () => {
    expect(gb.getCoordinate(1, 1).getData()).toHaveLength(2);
});

test('Gameboard placeShips', () => {
    const test = gb.placeShip(1, 1, 4, false);
    expect(test).toBeTruthy();
    expect(gb.placeShip(6, 1, 4, false)).toBe(false);
});

test('Gameboard receiveAttack', () => {
    gb.receiveAttack(1, 1);
    expect(gb.getCoordinateData(1, 1)[1]).toBe(true);
});