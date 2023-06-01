import { globals, entityList } from "../../sharedGlobals";
import { artificialSelection, restockEntityList } from "./artificialSelection";

/* 
All this does is run a simulation where the best output is 1, just to make sure the evolution function and mutation function works

*/


export function basicCheck() {
    for (let i = 0; i < entityList.NNs.length; i++) {
        let output = entityList.NNs[i].update(0, Math.random(), -Math.random(), Math.random() * 10 - 5, 7);
        globals.fitnessDictionary[i] = output[0];
        console.log(output[0], entityList.NNs.length, entityList.NNs[i], globals.fitnessDictionary);
    }
    let fitness = artificialSelection()
    restockEntityList(fitness)
    for (let net = 0; net < globals.simulatedNNs; net++) {
        entityList.NNs[net].fullMutate(0, 10, 0.1);
    }    
}