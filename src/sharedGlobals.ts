import { Car } from './app/classes/Car';
import { Flappy } from './app/classes/Flappy';
import { Pipes } from './app/classes/Pipes';
import { NN } from './app/classes/NN';
import { Barrier } from './app/classes/Barrier';


// globals
let globals = {pipeTimer: 100 as number,
                timer: 0 as number,
                simulatedNNs: 100 as number,
                fitnessDictionary : {} as { [key: number]: number},
                NNKeepers: 10 as number,
                NNBrain: [4, 8, 8, 8, 6, 4, 1] as number[],
                bestNNs: {} as { [key: number]: string},
                mousePos: {} as { [key: string]: number},
                mutationRateMutationRate: .3 as number,
                mutationMutationAmount: 2 as number,
                // checkpoints: [[324,66], [584,89], [806,165], [945,301], [924,445], [929,576], ] as number[][],
                checkpoints: [ [208,208], [489,122], [697,132], [907,196], [920,394], [794,481], [550,494], [350,466], [261,349], [453,292], [705,253], [770,334], [580,374]] as number[][],
                checkpointSize: 50 as number,
                timerLimit: 2000
};
const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

let entityList: {
  "Flappies": Flappy[];
  "Pipes": Pipes[];
  "Cars": Car[];
  "NNs": NN[];
  "Barrier": Barrier[];
} = {
  "Flappies": [],
  "Pipes": [],
  "Cars": [],
  "NNs": [],
  "Barrier": [],
};

let human : boolean = false;
let pressedKeys : {[keyCode: number]: boolean} = {};

window.onkeyup = function(e) { pressedKeys[e.keyCode] = false; }
window.onkeydown = function(e) { pressedKeys[e.keyCode] = true; }
export {globals, canvas, ctx, entityList, pressedKeys, human};
