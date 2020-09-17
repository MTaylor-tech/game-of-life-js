import {World} from './Cell.js';
// import 'Cell';

let new_world = new World(10,25);
new_world.randomize();

new_world.run(10);
