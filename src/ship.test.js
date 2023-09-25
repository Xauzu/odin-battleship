import {Ship} from './ship';

const ship3 = new Ship(3);

test('Ship length', () => {
    expect(ship3.getLength()).toBe(3);
});

test('Ship hit and isSunk', () => {
    ship3.hit();
    expect(ship3.isSunk()).toBe(false);

    ship3.hit();
    expect(ship3.isSunk()).toBe(false);

    ship3.hit();
    expect(ship3.isSunk()).toBe(true);
})