import {Player} from './player';

const p = new Player('Test');

test('Player', () => {
    expect(p.getName()).toBe('Test');
})

test('Player change name', () => {
    p.setName('Test 2');
    expect(p.getName()).toBe('Test 2');
})