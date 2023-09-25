import {Coordinate} from './coordinate';

const coord = new Coordinate(2, 2);

test('Coordinate length', () => {
    expect(coord.getData()).toHaveLength(2);
}) 

test('Coordinate shoot isShot', () => {
    coord.shoot();
    expect(coord.isShot()).toBe(true);
})