import { drivingStart } from './app/actions/drivingStart';
import { NN } from './app/classes/NN';
import { Car } from 'app/classes/Car';

// globals
let globals = {
                timer: 0 as number,
                simulatedNNs: 100 as number,
                fitnessDictionary : {} as { [key: number]: number},
                NNKeepers: 25 as number,
                NNBrain: [4, 5, 5, 5, 1] as number[],
                bestNNs: {} as { [key: number]: string}
};
const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

let entityList: {
  "Cars": Car[];
  "NNs": NN[];
} = {
  "Cars": [],
  "NNs": [],
};

let human : boolean = true;
let pressedKeys : {[keyCode: number]: boolean} = {};

window.onkeyup = function(e) { pressedKeys[e.keyCode] = false; }
window.onkeydown = function(e) { pressedKeys[e.keyCode] = true; }
export {globals, canvas, ctx, entityList, pressedKeys, human};

console.log('ran here')
drivingStart();




