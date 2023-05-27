import { entityList, globals } from "../../index.js";
import { Pipes } from "../classes/Pipes.js";
import { Flappy } from "../classes/Flappy.js";
import { NN } from "../classes/NN.js";
import { main } from "../game.js";
import { artificialSelection } from "./artificialSelection.js";



export function simulationReset(flappies, fitnessDictionary) {
    globals.timer = 0;
    globals.pipeTimer = 0;
    for (const [key, value] of Object.entries(entityList)) {
        entityList[key] = [];      
    }
    let fitness = artificialSelection(fitnessDictionary, 100)
    entityList.Pipes.push(new Pipes());
    for (let i = 0; i < flappies; i++) {
        entityList.Flappies.push(new Flappy());
        entityList.NNs.push(fitness[i][1]);
    }
    
}