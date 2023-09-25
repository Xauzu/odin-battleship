import {Gameboard} from './gameboard';

const gb = Gameboard();

test('Gameboard exist', () => {
    expect(gb).toBeTruthy();
    expect(gb.getGrid()).toBeTruthy();
}) 

test('Gameboard getCoordinate', () => {
    expect(gb.getCoordinate(1, 1)).toHaveLength(2);
})

test('Gameboard receiveAttack', () => {
    gb.receiveAttack(1, 1);
    expect(gb.getCoordinate(1, 1)[1]).toBe(true);
})