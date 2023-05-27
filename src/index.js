import { start } from './app/actions/start';

// globals
let globals = {pipeTimer: 100,
                timer: 0,
                simulatedFlappies: 100,
                fitnessDictionary : {}
};
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let entityList = {Flappies: [], Pipes: [], NNs: []};
let human = false;
let pressedKeys = {};

window.onkeyup = function(e) { pressedKeys[e.keyCode] = false; }
window.onkeydown = function(e) { pressedKeys[e.keyCode] = true; }
export {globals, canvas, ctx, entityList, pressedKeys, human};

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

start();




