import { start } from './app/actions/start';
import { Flappy } from './app/classes/Flappy';
import { Pipes } from './app/classes/Pipes';
import { NN } from './app/classes/NN';

// globals
let globals = {pipeTimer: 100,
                timer: 0,
                simulatedFlappies: 100,
                fitnessDictionary : {} as { [key: number]: number }
};
const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

let entityList: {
  "Flappies": Flappy[];
  "Pipes": Pipes[];
  "NNs": NN[];
} = {
  "Flappies": [],
  "Pipes": [],
  "NNs": [],
};

let human : boolean = false;
let pressedKeys : {[keyCode: number]: boolean} = {};

window.onkeyup = function(e) { pressedKeys[e.keyCode] = false; }
window.onkeydown = function(e) { pressedKeys[e.keyCode] = true; }
export {globals, canvas, ctx, entityList, pressedKeys, human};


start();




