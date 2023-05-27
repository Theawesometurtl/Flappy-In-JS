import { entityList, globals } from "../../index.js";
import { Pipes } from "../classes/Pipes.js";
import { Flappy } from "../classes/Flappy.js";
import { NN } from "../classes/NN.js";
import { main } from "../game.js";
import { artificialSelection, restockEntityList } from "./artificialSelection.js";




export function simulationReset(flappies) {
    let fitness = artificialSelection(10);
    restockEntityList(fitness);
    globals.timer = 0;
    globals.pipeTimer = 0;
    for (let net = 0; net < entityList.NNs.length; net++) {
        entityList.NNs[net].fullMutate(0, 1000, 0.1);
    }    
    entityList.Pipes.push(new Pipes());
    for (let i = 0; i < flappies; i++) {
        entityList.Flappies.push(new Flappy());
        entityList.NNs.push(fitness[i][1]);
    }
    // console.log(entityList.NNs);
    // console.log(entityList.Flappies);
    // console.log(entityList.Pipes);
    
}